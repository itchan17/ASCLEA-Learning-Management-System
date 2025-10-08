import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function useActivitySubmission({ courseId, assessmentId }) {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileName, setFileName] = useState(null);

    useEffect(() => {
        if (files.length > 0) {
            handleUploadFile();
        }
    }, [files]);

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

    const handleRemoveFile = (assessmentSubmissionId, fileId) => {
        setIsLoading(true);
        router.delete(
            route("activity.file.remove", {
                course: courseId,
                assessment: assessmentId,
                assessmentSubmission: assessmentSubmissionId,
                file: fileId,
            }),
            {
                showProgress: false,
                preserveScroll: true,
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    const handleSubmitActivity = () => {
        setIsLoading(true);
        router.put(
            route("activity.submit", {
                course: courseId,
                assessment: assessmentId,
            }),
            {},
            {
                showProgress: false,
                preserveScroll: true,
                only: ["assessmentSubmission"],
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    return {
        files,
        setFiles,
        isLoading,
        handleViewingFile,
        fileUrl,
        closeViewFile,
        fileName,
        handleRemoveFile,
        handleSubmitActivity,
    };
}
