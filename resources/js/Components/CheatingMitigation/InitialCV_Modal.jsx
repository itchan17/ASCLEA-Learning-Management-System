import React, { useRef, useEffect, useState } from 'react';
import PrimaryButton from "../Button/PrimaryButton";
import Webcam from 'react-webcam';

export default function TestModal({ show, toggleModal, startCV, faceDetected, cameraStarted, error, webcamRef, webcamReady}) {
  const [processing, setProcessing] = React.useState(false);

  const videoConstraints = {
    width: 320,
    height: 320,
    facingMode: "user",
  };

  const callCV = async () => {
    setProcessing(true);
    try {
      await startCV(); 
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false); 
    }
  }

  React.useEffect(() => {
    // Automatically close the modal when face is detected
    if (faceDetected) {
      toggleModal();
    }
  }, [faceDetected]);

return (
<div
  className={`fixed inset-0 bg-black/25 z-50 flex items-center justify-center transition-all duration-300 ${
    show ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
  }`}
>
  <div
    className="
      bg-white p-6
      w-[32rem] max-w-[calc(100vw-2rem)]   
      min-w-[380px]                  
      min-h-[500px]                     
      max-h-[calc(100vh-2rem)]           
      flex flex-col items-center justify-center
      space-y-5 overflow-y-auto
      shadow-2xl rounded-lg
    "
  >
    <h1 className="text-center text-size4 font-semibold font-nunito-sans">Facial Detection</h1>

    <div className="w-79 h-79 border-4 border-ascend-blue rounded-md flex items-center justify-center mx-auto">
      {!cameraStarted && (
        <p className="text-ascend-gray1 text-size2 font-nunito-sans">Camera is off</p>
      )}
    </div>

    {error && (
      <div className="flex justify-center">
        <div
          role="alert"
          className="alert alert-error rounded-none font-nunito-sans mt-4 w-auto max-w-lg px-4 py-3 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="ml-2 break-words">{error}</span>
        </div>
      </div>
    )}

    <div className="flex justify-center font-nunito-sans text-size2">
      <PrimaryButton
        doSomething={callCV}
        isDisabled={processing}
        text="Open Camera"
      />
    </div>

    <div className="">
      {!cameraStarted ? (
        <p className="text-ascend-gray1 font-medium text-size2">
          Make sure camera permission is enabled in your browser.
        </p>
      ) : faceDetected ? (
        <p className="text-ascend-gray1 font-medium text-size2">
          Face detected! The quiz will begin.
        </p>
      ) : (
        <p className="text-ascend-gray1 font-medium text-size2">
          Face the camera directly with your full face visible.
        </p>
      )}
    </div>
    
  </div>
</div>

);
}


