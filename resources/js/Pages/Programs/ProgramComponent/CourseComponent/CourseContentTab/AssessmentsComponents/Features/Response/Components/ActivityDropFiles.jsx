import React, { useCallback, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { FaBullseye } from "react-icons/fa";

export default function ActivityDropFiles({
    disabled = false,
    setFiles,
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
    const [errors, setErrors] = useState([]);

    // Callback function for handling drop files
    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        setErrors([]);
        if (fileRejections.length > 0) {
            const uniqueErrorMessages = fileRejections
                .flatMap((r) => r.errors.map((e) => e.code))
                .filter((code, i, a) => a.indexOf(code) === i)
                .map((code) => errorMessages[code] || "Unknown error");

            setErrors(uniqueErrorMessages);
        }

        if (acceptedFiles.length > 0) {
            // Save the files in array
            setFiles((prev) => [...prev, ...acceptedFiles]);
        }
    }, []);

    const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
        useDropzone({
            onDrop,
            disabled,
            accept: allowedFiles,
            maxFiles: 10,
            maxSize: 209715200,
        });

    const errorMessages = {
        "file-invalid-type":
            "Only PNG, JPG, PDF, PPTX, or DOCX files are allowed",
        "too-many-files": "Maximum of 10 files can be uploaded",
        "file-too-large": "Maximum file size is 200MB",
    };

    return (
        <div className="relative">
            {/* File Dropzone */}
            <div>
                <div
                    {...getRootProps()}
                    className="flex flex-wrap items-center justify-center border-2 border-dashed border-ascend-gray1 min-h-15  w-full cursor-pointer hover:bg-ascend-lightblue transition-colors duration-300 gap-2"
                >
                    <input {...getInputProps()}></input>
                    <FiUploadCloud className="shrink-0 text-size4" />
                    <span className=" text-size1 text-center">
                        Drop files here or{" "}
                        <span
                            className={`${
                                disabled
                                    ? "text-ascend-black"
                                    : "text-ascend-blue"
                            } font-bold`}
                        >
                            Browse files
                        </span>
                    </span>
                </div>
                {errors.length > 0 && (
                    <p className="text-size1 text-ascend-red">
                        {errors.join(", ")}
                    </p>
                )}
            </div>

            {disabled && (
                <div className="absolute inset-0 bg-ascend-gray1/15"></div>
            )}
        </div>
    );
}
