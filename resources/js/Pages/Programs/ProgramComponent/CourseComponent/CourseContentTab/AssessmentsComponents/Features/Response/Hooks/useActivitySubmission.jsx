import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import useModulesStore from "../../../../ModulesComponents/Stores/modulesStore";

export default function useActivitySubmission({ courseId, assessmentId }) {
    // Module store
    const unlockSectionAndSectionItems = useModulesStore(
        (state) => state.unlockSectionAndSectionItems
    );

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

    const handleViewingFile = (assessmentSubmissionId, fileId, fileName) => {
        const url = route("activity.file.stream", {
            course: courseId,
            assessment: assessmentId,
            file: fileId,
            assessmentSubmission: assessmentSubmissionId,
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
                only: ["assessment", "assessmentSubmission"],
                onSuccess: (page) => {
                    if (page.props.assessment.section_item) {
                        const studentProgress =
                            page.props.assessment.section_item.student_progress;

                        unlockSectionAndSectionItems(
                            courseId,
                            page.props.assessment.section_item.section_id,
                            page.props.assessment.section_item.section_item_id,
                            studentProgress
                        );
                    }
                },
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
