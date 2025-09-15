import React, { useCallback } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";

export default function DropFiles({
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
    },
}) {
    // callback function for handling drop files
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            // save the files in array
            handleFileChange(fieldName, acceptedFiles);
        }
        // acceptedFiles.forEach((file) => {
        //     const reader = new FileReader();

        //     reader.onabort = () => console.log("file reading was aborted");
        //     reader.onerror = () => console.log("file reading has failed");
        //     reader.onload = () => {
        //         // Do whatever you want with the file contents
        //         const binaryStr = reader.result;
        //         console.log(binaryStr);
        //     };
        //     reader.readAsArrayBuffer(file);
        // });
    }, []);

    const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
        useDropzone({
            onDrop,
            accept: allowedFiles,
        });

    // for file typ valdiation
    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map((e) => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

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
            <section className="">
                <div
                    {...getRootProps()}
                    className="flex flex-wrap items-center justify-center border-2 border-dashed border-ascend-gray1 min-h-15  w-full cursor-pointer hover:bg-ascend-lightblue transition-colors duration-300 gap-2"
                >
                    <input {...getInputProps()}></input>
                    <FiUploadCloud className="shrink-0 text-size4" />
                    <span className=" text-size1 text-center">
                        Drop files here or{" "}
                        <span className="text-ascend-blue font-bold">
                            Browse files
                        </span>
                    </span>
                </div>
            </section>
        </div>
    );
}
