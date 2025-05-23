import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { FiUploadCloud } from "react-icons/fi";

export default function DropFiles({
    toggleDropFiles,
    handleFileChange,
    fieldName,
}) {
    const fileTypes = ["png", "jpeg", "jpg", "pdf", "pptx"];

    const handleChange = (file) => {
        const fileArray = Array.from(file);
        handleFileChange(fieldName, fileArray);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <label className="font-bold">Upload Files</label>
                <span
                    onClick={toggleDropFiles}
                    className="cursor-pointer text-ascend-red"
                >
                    Cancel
                </span>
            </div>

            {/* File Dropzone */}

            <FileUploader
                handleChange={handleChange}
                multiple={true}
                name="file"
                types={fileTypes}
            >
                <div className="flex items-center justify-center border-2 border-dashed border-ascend-gray1 h-15 w-full cursor-pointer hover:bg-ascend-lightblue transition-colors duration-300">
                    <div className="flex items-center gap-2 text-ascend-black">
                        <FiUploadCloud className="shrink-0 text-size4" />
                        <span className=" text-size1 text-center">
                            Drop files here or{" "}
                            <span className="text-ascend-blue font-bold">
                                Browse files
                            </span>
                        </span>
                    </div>
                </div>
            </FileUploader>
        </div>
    );
}
