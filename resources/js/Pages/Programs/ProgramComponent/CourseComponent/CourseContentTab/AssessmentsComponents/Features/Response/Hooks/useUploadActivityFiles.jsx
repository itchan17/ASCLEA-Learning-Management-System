import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function useUploadActivityFiles({ courseId, assessmentId }) {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        if (files.length > 0) {
            handleUploadFile();
        }
    }, [files]);

    return { files, setFiles, isLoading };
}
