import cv2
import os
import time

laravel_root = os.path.abspath(os.path.join(os.getcwd(), ".."))

# Correct Laravel public storage path
ascleaStorage = os.path.join(laravel_root, "public", "storage", "screenshotsCV")
os.makedirs(ascleaStorage, exist_ok=True)

def save_screenshot(frame, label):
    # Generate unique filename
    file_name = f"{label}_{int(time.time())}.jpg"
    full_path = os.path.join(ascleaStorage, file_name)
    
    # Save the image
    cv2.imwrite(full_path, frame)
    print(f"[{label.upper()}] Screenshot saved: {full_path}")
    
    # Return both filename and public path
    public_path = f"/storage/screenshotsCV/{file_name}"
    return {
        "file_name": file_name,
        "file_path": public_path
    }
