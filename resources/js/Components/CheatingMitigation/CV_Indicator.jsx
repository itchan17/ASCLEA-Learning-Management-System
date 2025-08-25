import React, { useRef, useState, useEffect } from 'react';
import InitialCV_Modal from './InitialCV_Modal';
import { FaCheckCircle, FaExclamationTriangle, FaCamera } from "react-icons/fa";
import Webcam from 'react-webcam';
import { ToastContainer, toast, Bounce } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


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
  const [webcamReady, setWebcamReady] = useState(false);


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
      console.log("WarningLogs:", [...warningLogs, warning]);

      toast.warn(warning, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      style: { fontSize: "16px", padding: "8px" },
      })
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

        await fetch("http://127.0.0.1:5000/reset_cv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const detectLoop = async () => {
        if (!webcamRef.current) {
            setTimeout(detectLoop, 1000); // Retry
            return;
        }

        const imageSrc = webcamRef.current.getScreenshot();

          if (!imageSrc) {
            console.log("Webcam warming up... retrying");
            setTimeout(detectLoop, 1000);
            return;
          }

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
          {webcamReady ? (
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
    </div>

{cameraStarted && (
  <div
    className={`fixed z-[60] transition-all duration-300 rounded-md overflow-hidden bg-black
      ${showTestModal
        ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-7 w-82 h-82 border-4 border-ascend-blue'
        : minimized
          ? 'bottom-4 right-4 w-12 h-12 border border-ascend-blue rounded-full'
          : 'top-4 right-4 w-40 h-40 border-4 border-ascend-blue'}
    `}
  >
    {/* Minimize Button */}
    <button
      onClick={() => setMinimized(!minimized)}
      className="absolute top-1 right-1 z-10 bg-ascend-blue bg-opacity-50 text-white text-xs px-2 py-1 rounded"
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

      onUserMedia={() => { 
        console.log("Webcam started successfully"); 
        setWebcamReady(true); 
      }} 

      onUserMediaError={(err) => { 
        console.error("Webcam error:", err); 
        setWebcamReady(false); 
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
        webcamReady={webcamReady}
      />

      <ToastContainer />
  </>
);
}

export default Monitoring
Monitoring.layout = null;