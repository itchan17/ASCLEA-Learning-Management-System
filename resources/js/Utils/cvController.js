let stopCVCallback = null;

export const registerStopCV = (callback) => {
  stopCVCallback = callback;
};

export const endCV = async () => {
  if (stopCVCallback) {
    await stopCVCallback();
    console.log("CV successfully ended.");
  } else {
    console.warn("No CV instance registered yet.");
  }
};
