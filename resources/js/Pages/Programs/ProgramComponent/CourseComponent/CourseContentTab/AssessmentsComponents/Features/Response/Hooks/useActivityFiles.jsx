import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function useActivityFiles({ courseId, assessmentId }) {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileName, setFileName] = useState(null);

    const handleUploadFile = () => {
        setIsLoading(true);
        router.post(
            route("upload.activity.files", {
                course: courseId,
                assessment: assessmentId,
            }),
            { _method: "put", activity_files: files },
            {
                showProgress: false,
                preserveScroll: true,
                onFinish: () => {
                    setIsLoading(false);
                    setFiles([]);
                },
            }
        );
    };

    const handleViewingFile = (fileId, fileName) => {
        const url = route("activity.file.stream", {
            course: courseId,
            assessment: assessmentId,
            file: fileId,
        });

        setFileUrl(url);
        setFileName(fileName);
    };

    const closeViewFile = () => {
        setFileUrl(null);
    };

    useEffect(() => {
        if (files.length > 0) {
            handleUploadFile();
        }
    }, [files]);

    return {
        files,
        setFiles,
        isLoading,
        handleViewingFile,
        fileUrl,
        closeViewFile,
        fileName,
    };
}
