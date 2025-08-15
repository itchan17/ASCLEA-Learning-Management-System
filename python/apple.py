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
    cv_state["open_camera"] = False
    cv_state["close_camera"] = False
    cv_state["looking_away"] = False  

@app.route('/Asclea_Detection', methods=['POST'])
def asclea_detection():
    data = request.get_json()

    if 'image' not in data:
        return jsonify({"error": "No image data"}), 400
    
    target_classes = data.get('target_classes', [])

    try:
        image_data = data['image'].split(',')[1]
        image_bytes = base64.b64decode(image_data)
        image = Image.open(BytesIO(image_bytes)).convert('RGB')
        image_np = np.array(image)
        frame = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

        reset_cv_state()
        detect_from_frame(frame, target_classes=target_classes)

        return jsonify({
            "detected_face": cv_state["detected_face"],
            "missing_face": cv_state["missing_face"],
            "detected_object": cv_state["detected_object"], 
            "looking_away": cv_state["looking_away"]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
