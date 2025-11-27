from flask import Flask, request, jsonify
import base64
from io import BytesIO
from PIL import Image
import numpy as np
import cv2
from ascleaCV import detect_from_frame
from monitor_state import cv_state
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def reset_cv_state():
    cv_state["detected_face"] = False
    cv_state["missing_face"] = False
    cv_state["detected_object"] = False
    cv_state["running"] = False
    cv_state["looking_away"] = False  
    cv_state["initial_Screenshot"] = False

@app.route('/reset_cv', methods=['POST'])
def reset_cv():
    reset_cv_state()
    return jsonify({"status": "reset"})

@app.route('/Asclea_Detection', methods=['POST'])
def asclea_detection():
    data = request.get_json()

    if 'image' not in data:
        return jsonify({"error": "No image data"}), 400
    
    target_classes = data.get('target_classes', [])
    allowed_positions = data.get('allowedPositions', [])
    cv_state["running"] = True
    try:
        image_data = data['image'].split(',')[1]
        image_bytes = base64.b64decode(image_data)
        image = Image.open(BytesIO(image_bytes)).convert('RGB')
        image_np = np.array(image)
        frame = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

        screenshot_info = detect_from_frame(frame, target_classes=target_classes, allowedPositions=allowed_positions)

        return jsonify({
            "detected_face": cv_state["detected_face"],
            "missing_face": cv_state["missing_face"],
            "detected_object": cv_state["detected_object"], 
            "looking_away": cv_state["looking_away"],
            "file_name": screenshot_info["file_name"] if screenshot_info else None,
            "file_path": screenshot_info["file_path"] if screenshot_info else None
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/end-cv', methods=['POST'])
def end_cv():
    try:
        cv_state["running"] = False

        # Reset states to prevent false positives
        cv_state["detected_face"] = False
        cv_state["missing_face"] = False
        cv_state["detected_object"] = False
        cv_state["looking_away"] = False
        cv_state["initial_Screenshot"] = False

        print("CV session stopped manually from frontend.")
        return jsonify({"status": "cv_stopped"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
