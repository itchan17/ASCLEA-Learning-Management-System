from flask import Flask, jsonify, request
from monitor_state import cv_state
from cv_monitoring import cv_monitor
import threading
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/status')
def status():
    return jsonify(cv_state)

def reset_cv_state():
    cv_state["detected_face"] = False
    cv_state["missing_face"] = False
    cv_state["detected_object"] = False
    cv_state["running"] = False
    cv_state["open_camera"] = False
    cv_state["close_camera"] = False


@app.route('/start-camera', methods=['POST'])
def start_camera():
    
    reset_cv_state()
    # Start the monitoring thread only if it's not already running
    if not cv_state["running"]:
        cv_state["open_camera"] = True
        import threading
        threading.Thread(target=cv_monitor, daemon=True).start()

    return jsonify({"status": "Camera started"})

@app.route('/close-camera', methods=['POST'])
def close_camera():
    cv_state["close_camera"] = True
    return jsonify({"status": "closing camera"})

@app.route('/detection', methods=['GET'])
def detection():
    return jsonify({
        "detected_face": cv_state["detected_face"],
        "missing_face": cv_state["missing_face"],
        "detected_object": cv_state["detected_object"]
    })

if __name__ == '__main__':
    app.run(debug=True)
