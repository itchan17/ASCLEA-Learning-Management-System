import React, { useCallback } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";

export default function DropFiles({
    disabled = false,
    toggleDropFiles,
    handleFileChange,
    fieldName,
    withCancel = true,
    allowedFiles = {
        "image/png": [".png"],
        "image/jpeg": [".jpeg", ".jpg"],
        "application/pdf": [".pdf"],
        "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            [".pptx"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            [".docx"],
    },
}) {
    // callback function for handling drop files
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            // save the files in array
            handleFileChange(fieldName, acceptedFiles);
        }
    }, []);

    const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
        useDropzone({
            onDrop,
            disabled,
            accept: allowedFiles,
        });

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <label className="font-bold">Upload Files</label>
                {withCancel && (
                    <span
                        onClick={toggleDropFiles}
                        className="cursor-pointer text-ascend-red"
                    >
                        Cancel
                    </span>
                )}
            </div>
            {/* File Dropzone */}
            <div
                {...getRootProps()}
                className="relative flex flex-wrap items-center justify-center border-2 border-dashed border-ascend-gray1 min-h-15  w-full cursor-pointer hover:bg-ascend-lightblue transition-colors duration-300 gap-2"
            >
                <input {...getInputProps()}></input>
                <FiUploadCloud className="shrink-0 text-size4" />
                <span className=" text-size1 text-center">
                    Drop files here or{" "}
                    <span
                        className={`${
                            disabled ? "text-ascend-black" : "text-ascend-blue"
                        } font-bold`}
                    >
                        Browse files
                    </span>
                </span>

                {disabled && (
                    <div className="absolute inset-0 bg-ascend-gray1/15"></div>
                )}
            </div>
        </div>
    );
}
