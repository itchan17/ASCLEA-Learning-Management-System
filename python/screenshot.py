#imports for screenshot functionality
import cv2
import os
import time

output_dir = os.path.expanduser("~/Desktop/trialpython")
os.makedirs(output_dir, exist_ok=True)

#Function to save screenshots
def save_screenshot(frame, label):
    filename = os.path.join(output_dir, f"{label}_{int(time.time())}.jpg")
    cv2.imwrite(filename, frame)
    print(f"[{label.upper()}] Screenshot saved: {filename}")
    return filename
