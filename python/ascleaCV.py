from flask import Flask
from monitor_state import cv_state
import time
from ultralytics import YOLO
import mediapipe as mp
import numpy as np
import cv2
from screenshot import save_screenshot

app = Flask(__name__)
model = YOLO("yolov8n.pt")

# Cooldown and timers
cooldown_interval = 60
no_face_timeout = 10  # seconds
last_face_seen_time = time.time()
flag_duration = 5  # seconds for violations

# Flags and timers
missing_start_time = None
object_start_time = None
face_missing_flagged = False
object_detected_flagged = False

pose_duration_threshold = 5
pose_timer = {pose: None for pose in ["Looking Left", "Looking Right", "Looking Up", "Looking Down"]}
pose_flagged = {pose: False for pose in ["Looking Left", "Looking Right", "Looking Up", "Looking Down"]}
last_saved_times = {
    "FACE_MISSING": 0,
    "OBJECT_DETECTED": 0,
    "LOOKING_LEFT": 0,
    "LOOKING_RIGHT": 0,
    "LOOKING_UP": 0,
    "LOOKING_DOWN": 0,
}

# Mediapipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, refine_landmarks=True)

initial_Screenshot = True

def detect_from_frame(frame, target_classes):
    global missing_start_time, object_start_time
    global face_missing_flagged, object_detected_flagged
    global last_saved_times, pose_timer, pose_flagged
    global last_face_seen_time, initial_Screenshot

    current_time = time.time()
    face_found = False

    # ==============================
    # YOLOv8 Object Detection
    # ==============================
    results = model(frame, verbose=False)[0]

    # ==============================
    # Mediapipe Face Mesh
    # ==============================
    image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image_rgb.flags.writeable = False
    results_mesh = face_mesh.process(image_rgb)
    image_rgb.flags.writeable = True

    if results_mesh.multi_face_landmarks:
        # Face detected
        face_found = True
        last_face_seen_time = current_time
        cv_state["detected_face"] = True

        if initial_Screenshot:
            save_screenshot(frame, "INITIAL_SCREENSHOT")
            initial_Screenshot = False
    else:
        face_found = False

    # ==============================
    # If no face has EVER been detected → skip everything
    # ==============================
    if not cv_state.get("detected_face", False):
        return

    # ==============================
    # Face Missing Logic
    # ==============================
    if face_found:
        missing_start_time = None
        face_missing_flagged = False
        cv_state["missing_face"] = False
    else:
        if missing_start_time is None:
            missing_start_time = current_time
        elif (current_time - missing_start_time >= flag_duration and
              not face_missing_flagged and
              current_time - last_saved_times["FACE_MISSING"] >= cooldown_interval):
            save_screenshot(frame, "FACE_MISSING")
            last_saved_times["FACE_MISSING"] = current_time
            face_missing_flagged = True
            cv_state["missing_face"] = True

        # If face missing, also reset other states
        cv_state["looking_away"] = False
        cv_state["detected_object"] = False
        return  # stop here, don’t process pose/objects

    # ==============================
    # Head Pose Estimation
    # ==============================
    img_h, img_w, _ = frame.shape
    face_2d, face_3d = [], []
    pose_text = "Forward"

    for face_landmarks in results_mesh.multi_face_landmarks:
        for idx, lm in enumerate(face_landmarks.landmark):
            if idx in [33, 263, 1, 61, 291, 199]:
                if idx == 1:
                    nose_2d = (lm.x * img_w, lm.y * img_h)
                    nose_3d = (lm.x * img_w, lm.y * img_h, lm.z * 3000)
                x, y = int(lm.x * img_w), int(lm.y * img_h)
                face_2d.append([x, y])
                face_3d.append([x, y, lm.z])

        face_2d = np.array(face_2d, dtype=np.float64)
        face_3d = np.array(face_3d, dtype=np.float64)

        focal_length = 1 * img_w
        center = (img_w / 2, img_h / 2)
        cam_matrix = np.array([
            [focal_length, 0, center[0]],
            [0, focal_length, center[1]],
            [0, 0, 1]
        ], dtype="double")

        dist_matrix = np.zeros((4, 1), dtype=np.float64)

        success, rot_vec, trans_vec = cv2.solvePnP(face_3d, face_2d, cam_matrix, dist_matrix)
        rmat, _ = cv2.Rodrigues(rot_vec)
        angles, *_ = cv2.RQDecomp3x3(rmat)

        x_angle, y_angle, z_angle = angles[0] * 360, angles[1] * 360, angles[2] * 360

        if not initial_Screenshot:
            if y_angle < -15:
                pose_text = "Looking Left"
            elif y_angle > 15:
                pose_text = "Looking Right"
            elif x_angle < -15:
                pose_text = "Looking Down"
            elif x_angle > 15:
                pose_text = "Looking Up"

        # Pose timer logic
        if pose_text != "Forward":
            if pose_timer[pose_text] is None:
                pose_timer[pose_text] = current_time
            elif (current_time - pose_timer[pose_text] >= pose_duration_threshold and
                  not pose_flagged[pose_text] and
                  current_time - last_saved_times[pose_text.replace(" ", "_").upper()] >= cooldown_interval):

                save_screenshot(frame, pose_text.replace(" ", "_").upper())
                last_saved_times[pose_text.replace(" ", "_").upper()] = current_time
                pose_flagged[pose_text] = True
                cv_state["looking_away"] = True
        else:
            for key in pose_timer:
                pose_timer[key] = None
                pose_flagged[key] = False
            cv_state["looking_away"] = False

    # ==============================
    # Object Detection
    # ==============================
    object_found = any(int(box.cls) in target_classes for box in results.boxes)

    if object_found:
        if object_start_time is None:
            object_start_time = current_time
        elif (current_time - object_start_time >= flag_duration and
              not object_detected_flagged and
              current_time - last_saved_times["OBJECT_DETECTED"] >= cooldown_interval):

            save_screenshot(frame, "OBJECT_DETECTED")
            last_saved_times["OBJECT_DETECTED"] = current_time
            object_detected_flagged = True
            cv_state["detected_object"] = True
    else:
        object_start_time = None
        object_detected_flagged = False
        cv_state["detected_object"] = False
