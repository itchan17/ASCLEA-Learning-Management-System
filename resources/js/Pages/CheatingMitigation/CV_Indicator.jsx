import React, { useRef, useState, useEffect } from 'react';
import InitialCV_Modal from './InitialCV_Modal';
import { FaCheckCircle, FaExclamationTriangle, FaCamera } from "react-icons/fa";
import Webcam from 'react-webcam';

const Monitoring = () => {
  const [cameraStarted, setCameraStarted] = React.useState(false);
  const [faceDetected, setFaceDetected] = React.useState(false);
  const [objectDetected, setObjectDetected] = React.useState(false);
  const [missingFace, setMissingFace] = React.useState(false);
  const [lookingAway, setLookingAway] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [showTestModal, setShowTestModal] = React.useState(false);
  const [minimized, setMinimized] = useState(false);
  const webcamRef = useRef(null);


  const [count, setCount] = React.useState(0);
  const [warningLogs, setWarningLogs] = React.useState([]);

  const detectionIntervalRef = React.useRef(null);

  const itemsDetection = [73, 63, 67];

  // Show modal on first mount
  React.useEffect(() => {
    setShowTestModal(true);
  }, []);

  // Close modal when face is detected
  React.useEffect(() => {
    if (faceDetected) {
      setShowTestModal(false);
    }
  }, [faceDetected]);

  // Update warning count and logs
  React.useEffect(() => {
    const time = new Date().toLocaleTimeString().toLowerCase();
    let warning = "";

    if (objectDetected && missingFace && lookingAway) {
      warning = `${time} - Multiple violations: Object, Face Missing, Looking Away`;
    } else if (objectDetected && missingFace) {
      warning = `${time} - Object and Face Missing`;
    } else if (objectDetected && lookingAway) {
      warning = `${time} - Object and Looking Away`;
    } else if (missingFace && lookingAway) {
      warning = `${time} - Face Missing and Looking Away`;
    } else if (objectDetected) {
      warning = `${time} - Object-like detected`;
    } else if (missingFace) {
      warning = `${time} - Missing face`;
    } else if (lookingAway) {
      warning = `${time} - Looking away`;
    }

    if (warning) {
      setWarningLogs(prevLogs => [...prevLogs, warning]);
      setCount(prevCount => prevCount + 1);
    }
  }, [objectDetected, missingFace, lookingAway]);


const startCV = async () => {
    console.log("startCV triggered");

    try {
        setError(null);
        setFaceDetected(false);
        setObjectDetected(false);
        setMissingFace(false);
        setLookingAway(false);
        setWarningLogs([]);
        setCount(0);
        setCameraStarted(true);

        const detectLoop = async () => {
        if (!webcamRef.current) {
            setTimeout(detectLoop, 1000); // Retry
            return;
        }

        const imageSrc = webcamRef.current.getScreenshot();

        try {
            const response = await fetch("http://127.0.0.1:5000/Asclea_Detection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: imageSrc, target_classes: itemsDetection }),
            });

            if (!response.ok) {
            throw new Error("Backend responded with error");
            }

            const data = await response.json();

            setFaceDetected(data.detected_face);
            setObjectDetected(data.detected_object);
            setMissingFace(data.missing_face);
            setLookingAway(data.looking_away);
        } catch (err) {
            console.error("Error fetching detection data:", err);
        }

        setTimeout(detectLoop, 1000); // Loop every second
        };

        detectLoop(); // Start the loop

    } catch (error) {
        console.error("Failed to start camera:", error);
        setError("Something went wrong while starting the camera.");
        throw error;
    }
    };


  {/*const handleStop = async () => {
    try {
      await fetch("http://127.0.0.1:5000/end-cv", {
        method: "POST",
      });

      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
        detectionIntervalRef.current = null;
      }

      setCameraStarted(false);
    } catch (error) {
      console.error("Failed to stop cv:", error);
    }
  };*/}

return (
  <>
    <div className="flex items-center space-x-6 font-bold font-nunito-sans text-size2">
      {/* Camera Status */}
      <div className="flex items-center space-x-3 mt-[2px]">
        <span>Camera Status:</span>
        {cameraStarted ? (
          <div className="flex items-center space-x-1 text-ascend-green">
            <FaCheckCircle className="w-4 h-4 relative top-[-1px]" />
            <span>Active</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 text-ascend-red">
            <FaExclamationTriangle className="w-4 h-4 relative top-[-1px]" />
            <span>Inactive</span>
          </div>
        )}
      </div>

      {/* Warnings */}
      <div className="relative group">
        <div className="flex items-center space-x-1 cursor-pointer">
          <FaExclamationTriangle className="w-4 h-4 text-ascend-yellow relative top-[-1px]" />
          <span>Warnings: {count}</span>
        </div>
        <div className="absolute z-10 w-64 p-3 bg-white shadow-xl border border-gray-200 rounded-md top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex items-center mb-2 space-x-2">
            <FaExclamationTriangle className="w-5 h-5 text-ascend-yellow" />
            <span className="font-nunito-sans text-size3 font-semibold">Warning Logs: {count}</span>
          </div>

          <p className="text-size1 mb-2">
            Please stay within camera view and follow exam rules to avoid review.
          </p>

          {/* Scrollable list */}
          <div className="max-h-40 overflow-y-auto pr-1">
            <ul className="text-sm space-y-1">
                {warningLogs.length > 0 ? (
                warningLogs.map((log, index) => {
                    const [time, message] = log.split(" - ");
                    return (
                    <div key={index} className="text-size1">
                        <span className="text-black font-bold">{time}</span>
                        <span className="text-black font-semibold"> – {message}</span>
                    </div>
                    );
                })
                ) : (
                <div className="text-sm text-ascend-gray1">No warnings yet.</div>
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>

{cameraStarted && (
  <div
    className={`fixed z-[60] transition-all duration-300 rounded-md overflow-hidden bg-black
      ${showTestModal
        ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-82 h-82 border-4 border-ascend-gray1'
        : minimized
          ? 'bottom-4 right-4 w-12 h-12 border border-gray-300 rounded-full'
          : 'top-4 right-4 w-40 h-40 border-4 border-gray-300'}
    `}
  >
    {/* Minimize Button */}
    <button
      onClick={() => setMinimized(!minimized)}
      className="absolute top-1 right-1 z-10 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded"
    >
      {minimized ? '⤢' : '—'}
    </button>

    {/* Webcam always running */}
    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      className={`w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
        minimized ? 'opacity-50' : 'opacity-100'
      }`}
      videoConstraints={{
        width: 160,
        height: 160,
        facingMode: "user",
      }}
    />
  </div>
)}






      <InitialCV_Modal
        show={showTestModal} 
        toggleModal={() => setShowTestModal(false)}
        startCV={startCV}
        faceDetected={faceDetected}
        error={error}
        webcamRef={webcamRef}
        cameraStarted={cameraStarted}
      />
  </>
);
}

export default Monitoring
Monitoring.layout = null;