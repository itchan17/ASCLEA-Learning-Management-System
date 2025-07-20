from flask import Flask, request, jsonify
import cv2
import time
import threading
from collections import deque
import numpy as np
from ultralytics import YOLO
from monitor_state import cv_state

#Screenshot functionality
from screenshot import save_screenshot

class OptimizedTracker:
    def __init__(self):
        self.face_tracker = None
        self.face_tracking_active = False
        self.face_confidence_buffer = deque(maxlen=5)  # Smooth face detection
        self.object_confidence_buffer = deque(maxlen=3)  # Smooth object detection
        self.last_face_bbox = None
        
    def init_face_tracker(self, frame, bbox):
        """Initialize face tracker with detected face"""
        self.face_tracker = cv2.TrackerCSRT_create()
        self.face_tracker.init(frame, bbox)
        self.face_tracking_active = True
        self.last_face_bbox = bbox
        
    def update_face_tracker(self, frame):
        """Update face tracking"""
        if self.face_tracker is not None and self.face_tracking_active:
            success, bbox = self.face_tracker.update(frame)
            if success:
                self.last_face_bbox = bbox
                return True, bbox
            else:
                self.face_tracking_active = False
                return False, None
        return False, None

def cv_monitor():
    if cv_state["running"]:
        return
    
    cv_state["running"] = True
    
    # Initialize tracker
    tracker = OptimizedTracker()
    
    model = YOLO("yolov8n.pt")
    model.fuse()  # Fuse layers for faster inference
    
    # Load Haar Cascade for face detection (as backup)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    while not cv_state["open_camera"]:
        time.sleep(0.1)

    # Camera setup with optimizations
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)   # Lower resolution for better FPS
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    cap.set(cv2.CAP_PROP_FPS, 30)            # Set target FPS
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)      # Reduce buffer to minimize latency

    # Performance tracking
    fps_counter = 0
    fps_start_time = time.time()
    
    # Detection intervals for performance optimization
    yolo_detection_interval = 3  # Run YOLO every 3 frames
    face_detection_interval = 5  # Run face detection every 5 frames when tracking fails
    frame_count = 0
    
    # Cooldown and timing variables
    last_saved_time = 0
    save_interval = 30
    last_screenshot_time = None
    no_face_timeout = 10
    last_face_seen_time = time.time()
    
    # Target class IDs (book, laptop, cell phone)
    target_classes = [73, 63, 67]
    
    # State tracking with smoothing
    missing_start_time = None
    object_start_time = None
    flagged = False
    face_missing_flagged = False 
    object_detected_flagged = False
    flag_duration = 5
    face_screenshot_taken = False
    
    # Face detection confidence threshold
    face_confidence_threshold = 0.6

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame")
            break

        frame_count += 1
        current_time = time.time()
        
        # FPS calculation and display
        fps_counter += 1
        if current_time - fps_start_time >= 1.0:
            fps = fps_counter / (current_time - fps_start_time)
            print(f"FPS: {fps:.1f}")
            fps_counter = 0
            fps_start_time = current_time

        face_found = False
        run_yolo = frame_count % yolo_detection_interval == 0
        run_face_detection = frame_count % face_detection_interval == 0

        # Try face tracking first (most efficient)
        if tracker.face_tracking_active:
            tracking_success, tracked_bbox = tracker.update_face_tracker(frame)
            if tracking_success:
                face_found = True
                last_face_seen_time = current_time
                cv_state["detected_face"] = True
                
                # Draw tracked face
                x, y, w, h = map(int, tracked_bbox)
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.putText(frame, "Face Tracked", (x, y - 10),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
                
                # Add to confidence buffer
                tracker.face_confidence_buffer.append(1.0)
            else:
                # Tracking failed, will re-detect on next face detection interval
                tracker.face_tracking_active = False

        # Run YOLO detection (less frequent for performance)
        object_found = False
        if run_yolo:
            # Use smaller input size for faster inference
            results = model(frame, imgsz=320, verbose=False)[0]
            
            # Check for objects first (faster than person detection)
            object_confidences = []
            for box in results.boxes:
                class_id = int(box.cls)
                if class_id in target_classes:
                    conf = float(box.conf[0])
                    object_confidences.append(conf)
                    
                    # Draw object bounding boxes
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    label = f"{model.names[class_id]} {conf:.2f}"
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 200, 0), 2)
                    cv2.putText(frame, label, (x1, y1 - 10),
                               cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 200, 0), 2)
            
            # Smooth object detection
            if object_confidences:
                avg_conf = np.mean(object_confidences)
                tracker.object_confidence_buffer.append(avg_conf)
                object_found = len(tracker.object_confidence_buffer) >= 2 and \
                              np.mean(tracker.object_confidence_buffer) > 0.3
            else:
                tracker.object_confidence_buffer.append(0.0)
                object_found = np.mean(tracker.object_confidence_buffer) > 0.3
            
            # Face detection from YOLO (if not already tracking)
            if not face_found:
                for box in results.boxes:
                    class_id = int(box.cls)
                    if class_id == 0:  # person
                        x1, y1, x2, y2 = map(int, box.xyxy[0])
                        person_crop = frame[y1:y2, x1:x2]
                        
                        # Use Haar cascade on person region
                        faces = face_cascade.detectMultiScale(
                            person_crop, 
                            scaleFactor=1.1, 
                            minNeighbors=3,
                            minSize=(30, 30)
                        )
                        
                        if len(faces) > 0:
                            # Get the largest face
                            face_x, face_y, face_w, face_h = max(faces, key=lambda f: f[2] * f[3])
                            
                            # Convert to global coordinates
                            global_face_bbox = (x1 + face_x, y1 + face_y, face_w, face_h)
                            
                            # Initialize tracker with detected face
                            tracker.init_face_tracker(frame, global_face_bbox)
                            
                            face_found = True
                            last_face_seen_time = current_time
                            cv_state["detected_face"] = True
                            
                            # Draw face detection
                            fx1, fy1 = x1 + face_x, y1 + face_y
                            fx2, fy2 = fx1 + face_w, fy1 + face_h
                            cv2.rectangle(frame, (fx1, fy1), (fx2, fy2), (0, 255, 0), 2)
                            cv2.putText(frame, "Face Detected", (fx1, fy1 - 10),
                                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
                            
                            # Take initial face screenshot
                            if not face_screenshot_taken:
                                save_screenshot(frame, "FACE_INITIAL")
                                face_screenshot_taken = True
                            
                            break

        # Smooth face detection using confidence buffer
        if tracker.face_confidence_buffer:
            avg_face_conf = np.mean(tracker.face_confidence_buffer)
            face_found = avg_face_conf > face_confidence_threshold

        # Face absence logic
        if face_found:
            missing_start_time = None
            face_missing_flagged = False
            cv_state["missing_face"] = False
        else:
            if missing_start_time is None:
                missing_start_time = current_time
            elif current_time - missing_start_time >= flag_duration and not face_missing_flagged:
                save_screenshot(frame, "FACE_MISSING")
                face_missing_flagged = True
                cv_state["missing_face"] = True

        # Object detection logic
        if object_found:
            if object_start_time is None:
                object_start_time = current_time
            elif current_time - object_start_time >= flag_duration and not object_detected_flagged:
                save_screenshot(frame, "OBJECT_DETECTED")   
                object_detected_flagged = True
                cv_state["detected_object"] = True
                last_screenshot_time = current_time
        else:
            object_start_time = None
            object_detected_flagged = False
            cv_state["detected_object"] = False

        # Combined flag logic
        if (missing_start_time is not None and
            object_start_time is not None and
            (current_time - missing_start_time >= flag_duration) and
            (current_time - object_start_time >= flag_duration) and
            not flagged):
            save_screenshot(frame, "COMBINED_FLAGGED")
            flagged = True
            face_missing_flagged = True
            object_detected_flagged = True
            cv_state["detected_object"] = True
            cv_state["missing_face"] = True

        # No face overlay with timeout
        if not face_found and (current_time - last_face_seen_time > no_face_timeout):
            cv2.putText(frame, "No Face Detected", (30, 40),
                       cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            
        # Reset object detection flag after interval
        if object_detected_flagged and last_screenshot_time is not None:
            if current_time - last_screenshot_time >= save_interval:
                object_detected_flagged = False
                cv_state["detected_object"] = False
                last_screenshot_time = None

        # Display FPS on frame
        cv2.putText(frame, f"FPS: {fps_counter/(current_time-fps_start_time+0.001):.1f}", 
                   (frame.shape[1] - 100, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

        cv2.imshow("Optimized Face Detection", frame)

        # Exit conditions
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("Manual close triggered with 'q'")
            break

        if cv_state["close_camera"]:
            print("Camera close requested by front-end")
            break

    # Cleanup
    cap.release()
    cv2.destroyAllWindows()

    # Reset states
    cv_state["detected_face"] = False
    cv_state["missing_face"] = False
    cv_state["detected_object"] = False
    cv_state["running"] = False
    cv_state["open_camera"] = False
    cv_state["close_camera"] = False

    return
