import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FiUploadCloud } from "react-icons/fi";
import { AiFillFile, AiFillCloseCircle } from "react-icons/ai";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import useRegistrationStore from "../../Stores/Registration/registrationStore";

const Step5 = ({ noBorder = false, edit = false, showDragDrop = true }) => {
    const fileTypes = ["png", "jpeg", "jpg", "pdf"];
    const attachedfiles = useRegistrationStore(
        (state) => state.registration.attachedfiles
    );
    const addFiles = useRegistrationStore((state) => state.addFiles);
    const removeFile = useRegistrationStore((state) => state.removeFile);

    const handleChange = (newFiles) => {
        console.log("Render Registration Step 5");
        let fileArray = [];

        // Flatten FileList if needed
        if (Array.isArray(newFiles)) {
            newFiles.forEach((item) => {
                if (item instanceof FileList) {
                    fileArray.push(...Array.from(item)); // unpack each FileList
                } else {
                    fileArray.push(item);
                }
            });
        } else if (newFiles instanceof FileList) {
            fileArray = Array.from(newFiles);
        } else {
            fileArray = [newFiles];
        }

        addFiles(fileArray);
    };

    const handleRemoveFile = (index) => {
        removeFile(index);
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div
            className={`${
                noBorder
                    ? ""
                    : "mx-auto max-w-4xl border-[2px] border-ascend-gray1 bg-white p-10 shadow-lg"
            }`}
        >
            <h3 className="text-size3 mb-4 font-nunito-sans font-bold text-left text-black">
                Additional Requirements
            </h3>
            <div className="text-size1 mb-4 text-left text-black">
                1. Original TOR <br />
                2. Photocopy of TOR <br />
                3. NSO / PSA Birth Certificate <br />
                4. NSO / PSA Marriage Certificate (If Applicable) <br />
            </div>

            {showDragDrop && (
                <div className="flex items-center justify-center space-x-3 mb-10 mt-10">
                    <FileUploader
                        multiple={true}
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                    >
                        <div className="mx-auto max-w-4xl border-[3px] border-dashed border-ascend-gray1 bg-white cursor-pointer">
                            <div className="flex flex-col items-center justify-center pt-3 pb-3 pl-10 pr-10">
                                <FiUploadCloud className="text-ascend-gray1 text-[50px] mb-1" />
                                <h3 className="text-size3 mb-1 font-nunito-sans font-bold text-ascend-gray1">
                                    Drag & Drop Files here
                                </h3>
                                <h3 className="text-size3 mb-1 font-nunito-sans font-bold text-ascend-gray1">
                                    or
                                </h3>
                                <h3 className="text-size3 mb-2 font-nunito-sans font-bold text-ascend-gray1">
                                    click to upload
                                </h3>
                            </div>
                        </div>
                    </FileUploader>
                </div>
            )}

            <div className="flex flex-col space-y-4 mb-4">
                <h3 className="text-size3 font-nunito-sans font-bold text-left text-black">
                    Attached Files
                </h3>

                {attachedfiles.length === 0 ? (
                    <h3 className="text-size1 font-nunito-sans text-left text-gray-500">
                        No files attached
                    </h3>
                ) : (
                    attachedfiles.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-4 p-2 border border-ascend-lightblue rounded-md bg-white"
                        >
                            <AiFillFile
                                className={`${
                                    edit
                                        ? "text-ascend-gray1"
                                        : "text-ascend-blue  "
                                } text-2xl ml-2`}
                            />

                            <div className="flex-1">
                                <h4 className="text-base font-semibold font-nunito-sans text-black">
                                    {file.name}
                                </h4>
                            </div>
                            <div className="text-right">
                                <h4 className="text-sm font-bold font-nunito-sans text-black">
                                    Upload Complete
                                </h4>
                                <p className="text-sm text-black font-nunito-sans">
                                    Tap to Undo
                                </p>
                            </div>
                            <button
                                type="button"
                                disabled={edit}
                                onClick={() => handleRemoveFile(index)}
                            >
                                <AiFillCloseCircle
                                    className={`${
                                        edit
                                            ? "text-ascend-gray1"
                                            : "text-ascend-blue hover:opacity-80 transition-all duration-300 "
                                    } text-2xl mr-2`}
                                />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {!showDragDrop && (
                <div className="flex items-center justify-start space-x-3 mb-10 mt-10">
                    <FileUploader
                        multiple={true}
                        disabled={edit}
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                    >
                        <div
                            className={`${
                                edit
                                    ? "bg-ascend-gray1"
                                    : "bg-ascend-blue cursor-pointer hover:opacity-80 transition-all duration-300"
                            } mx-auto max-w-md flex items-center justify-center`}
                        >
                            <div className="flex flex-col items-center justify-center pt-2 pb-2 pl-4 pr-4">
                                <h3 className="text-sm font-nunito-sans font-bold text-white">
                                    Upload
                                </h3>
                            </div>
                        </div>
                    </FileUploader>
                </div>
            )}
        </div>
    );
};

export default Step5;
