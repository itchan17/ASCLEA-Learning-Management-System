#Important Packages 
from flask import Flask, request, jsonify
import cv2
import time
from ultralytics import YOLO
from monitor_state import cv_state

#Screenshot functionality
from screenshot import save_screenshot

def cv_monitor():

    if cv_state["running"]:
        return
    
    cv_state["running"] = True
    
    # Load YOLOv8 model
    model = YOLO("yolov8n.pt")

    # Load Haar Cascade for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    while not cv_state["open_camera"]:
        time.sleep(0.1)  # Wait until open_camera is set to True

    cap = cv2.VideoCapture(0)

    # Cooldown for saving screenshots
    last_saved_time = 0
    save_interval = 30  # seconds
    last_screenshot_time = None

    # Timer for face detection
    no_face_timeout = 10  # seconds
    last_face_seen_time = time.time()

    # Target class IDs (book, laptop, cell phone)
    target_classes = [73, 63, 67]

    # Timers and flags
    missing_start_time = None
    object_start_time = None
    flagged = False
    face_missing_flagged = False 
    object_detected_flagged = False
    flag_duration = 5  # seconds for violations (OBJECT DETECTED)
    face_screenshot_taken = False  # Initial face detection screenshot flag

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame")
            break

        face_found = False

        current_time = time.time()

        # Run YOLO detection
        results = model(frame, verbose=False)[0]

        # Detect person and check for face
        for box in results.boxes:
            class_id = int(box.cls)
            if class_id == 0:  # person
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                person_crop = frame[y1:y2, x1:x2]
                faces = face_cascade.detectMultiScale(person_crop, 1.1, 4)

                if len(faces) > 0:
                    face_found = True
                    last_face_seen_time = current_time
                    cv_state["detected_face"] = face_found

                    # Draw bounding box and label
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.putText(frame, "Face Detected", (x1, y1 - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

                    # Take one-time face screenshot
                    if not face_screenshot_taken:
                        save_screenshot(frame, "FACE_INITIAL")
                        face_screenshot_taken = True

                    break  # Stop after first person with face

        # Face logic
        if face_found:
            missing_start_time = None
            face_missing_flagged = False
            flagged = False
            cv_state["missing_face"] = False
        else:
            if missing_start_time is None:
                missing_start_time = current_time
            elif current_time - missing_start_time >= flag_duration and not face_missing_flagged:
                save_screenshot(frame, "FACE_MISSING")
                face_missing_flagged = True
                cv_state["missing_face"] = face_missing_flagged

        # Object logic
        object_found = any(int(box.cls) in target_classes for box in results.boxes)

        if object_found:
            if object_start_time is None:
                object_start_time = current_time
            elif current_time - object_start_time >= flag_duration and not object_detected_flagged:
                save_screenshot(frame, "OBJECT_DETECTED")   
                object_detected_flagged = True
                cv_state["detected_object"] = object_detected_flagged
                last_screenshot_time = current_time
        else:
            object_start_time = None
            object_detected_flagged = False
            flagged = False
            cv_state["detected_object"] = object_detected_flagged

        # Combined flag
        if (
            missing_start_time is not None and
            object_start_time is not None and
            (current_time - missing_start_time >= flag_duration) and
            (current_time - object_start_time >= flag_duration) and
            not flagged
        ):
            save_screenshot(frame, "COMBINED_FLAGGED")
            flagged = True
            face_missing_flagged = True
            object_detected_flagged = True
            cv_state["detected_object"] = object_detected_flagged
            cv_state["missing_face"] = face_missing_flagged

        # Draw object bounding boxes
        for obj_box in results.boxes:
            obj_id = int(obj_box.cls)
            if obj_id in target_classes:
                ox1, oy1, ox2, oy2 = map(int, obj_box.xyxy[0])
                conf = float(obj_box.conf[0])
                label = f"{model.names[obj_id]} {conf:.2f}"

                cv2.rectangle(frame, (ox1, oy1), (ox2, oy2), (255, 200, 0), 2)
                cv2.putText(frame, label, (ox1, oy1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 200, 0), 2)

        # No face overlay
        if not face_found and (current_time - last_face_seen_time > no_face_timeout):
            cv2.putText(frame, "No Face Detected", (30, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            
        # Reset object_detected_flagged after save_interval
        if object_detected_flagged and last_screenshot_time is not None:
            if current_time - last_screenshot_time >= save_interval:
                object_detected_flagged = False
                cv_state["detected_object"] = False
                last_screenshot_time = None

        cv2.imshow("Face Detection", frame)

        # Stop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("Manual close triggered with 'q'")
            break

        # Stop if front-end requested camera close
        if cv_state["close_camera"]:
            print("Camera close requested by front-end")
            break

    # Cleanup
    cap.release()
    cv2.destroyAllWindows()

    cv_state["detected_face"] = False
    cv_state["missing_face"] = False
    cv_state["detected_object"] = False
    cv_state["running"] = False
    cv_state["open_camera"] = False
    cv_state["close_camera"] = False

    return


