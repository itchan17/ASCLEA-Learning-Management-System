import React from 'react'

const CV_Testing = () => {
    const [cameraStarted, setCameraStarted] = React.useState(false);
    const [faceDetected, setFaceDetected] = React.useState(false);
    const [objectDetected, setObjectDetected] = React.useState(false);
    const [missingFace, setMissingFace] = React.useState(false);
    const [lookingAway, setLookingAway] = React.useState(false);

    const detectionIntervalRef = React.useRef(null);

  const handleStart = async () => {
  try {
    setFaceDetected(false);
    setObjectDetected(false);
    setMissingFace(false);
    setLookingAway(false);

    await fetch("http://127.0.0.1:5000/start-camera", {
      method: "POST",
    });
    setCameraStarted(true);

    const interval = setInterval(async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/detection");
        const data = await response.json();

        setFaceDetected(data.detected_face);
        setObjectDetected(data.detected_object);
        setMissingFace(data.missing_face);
        setLookingAway(data.looking_away);

      } catch (err) {
        console.error("Error fetching detection data:", err);
      }
    }, 1000);

    detectionIntervalRef.current = interval;

  } catch (error) {
    console.error("Failed to start camera or detect face:", error);
  }
};

const handleStop = async () => {
  try {
      await fetch("http://127.0.0.1:5000/close-camera", {
      method: "POST",
    });

    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    
    setCameraStarted(false);
  } catch (error) {
    console.error("Failed to stop camera:", error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-6 p-6">
        <div className="w-80 h-80 border-4 border-gray-400 rounded-md flex items-center justify-center">
          {cameraStarted ? (
            //Webcam view CV
            <></>
          ): (
              <p className="text-gray-500">Camera View</p>
          )}
        </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
              <h1 className="text-2xl font-bold mb-4 text-center">
                Camera Testing
              </h1>
              <div className="flex items-center justify-center mb-4">
            {!cameraStarted ? (
              <button
                onClick={handleStart}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Start Camera
              </button>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={handleStop}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                >
                  Stop Camera
                </button>
                <p className="text-gray-600 mb-4 text-center">
                  Camera is running...
                </p>
                {!faceDetected ? (
                  <p className="text-red-600 mb-4 text-center">
                    No face detected. Please look at the camera.
                  </p>
                ) : (
                  <>
                    {!missingFace ? (
                      <p className="text-green-600 mb-4 text-center">
                        Face detected. Screenshot has been taken.
                      </p>
                    ) : (
                      <p className="text-red-600 mb-4 text-center">
                        Face missing. Please look at the camera.
                      </p>
                    )}
                    {objectDetected && (
                      <p className="text-red-600 mb-4 text-center">
                        Object detected. Screenshot has been taken.
                      </p>
                    )}
                    {lookingAway && (
                      <p className="text-red-600 mb-4 text-center">
                        Looking away. Screenshot has been taken.
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
            </div>
          </div>
      </div>
  )
}



export default CV_Testing;
CV_Testing.layout = null;

