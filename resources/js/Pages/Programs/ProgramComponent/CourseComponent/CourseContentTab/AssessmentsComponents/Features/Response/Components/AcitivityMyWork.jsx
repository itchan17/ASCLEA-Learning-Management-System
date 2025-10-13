import { useEffect, useState } from "react";
import PrimaryButton from "../../../../../../../../../Components/Button/PrimaryButton";
import ActivityDropFiles from "./ActivityDropFiles";
import Loader from "../../../../../../../../../Components/Loader";
import File from "../../../../File";
import useActivitySubmission from "../Hooks/useActivitySubmission";
import { usePage } from "@inertiajs/react";
import ModalContainer from "../../../../../../../../../Components/ModalContainer";
import DocumentViewer from "../../../../MaterialsComponents/DocumentViewer";
import ModalDocViewer from "../../../../../../../../../Components/ModalDocViewer";

export default function AcitivityMyWork() {
    const { courseId, assessment, assessmentSubmission } = usePage().props;
    const [isOverDueDate, setIsOverDueDate] = useState(
        assessment.due_datetime
            ? new Date() > new Date(assessment.due_datetime)
            : null
    );

    // Custom hooks
    const {
        files,
        setFiles,
        isLoading,
        fileUrl,
        handleViewingFile,
        closeViewFile,
        fileName,
        handleRemoveFile,
        handleSubmitActivity,
    } = useActivitySubmission({
        courseId,
        assessmentId: assessment.assessment_id,
    });

    return (
        <>
            <h1 className="font-bold">My Work</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {/* display the uploaded file */}
                {assessmentSubmission &&
                    assessmentSubmission.activity_files.length > 0 &&
                    assessmentSubmission.activity_files.map((file) => (
                        <File
                            key={file.activity_file_id}
                            isDisabled={isLoading}
                            onClick={() =>
                                handleViewingFile(
                                    file.activity_file_id,
                                    file.file_name
                                )
                            }
                            withRemove={
                                assessmentSubmission &&
                                assessmentSubmission.submission_status !==
                                    "not_submitted"
                                    ? false
                                    : true
                            }
                            fileName={file.file_name}
                            onRemove={() =>
                                handleRemoveFile(
                                    assessmentSubmission.assessment_submission_id,
                                    file.activity_file_id
                                )
                            }
                        />
                    ))}

                {/* Displays uploading of file */}
                {console.log(files)}
                {files.length > 0 &&
                    files.map((file) => (
                        <div key={file.name} className="relative">
                            <File withRemove={true} fileName={file.name} />

                            {isLoading && (
                                <div className="absolute inset-0 bg-ascend-lightblue/30 z-10 flex items-center justify-center">
                                    <span className="text-white font-medium">
                                        <Loader color="text-ascend-blue" />
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="flex flex-col gap-2">
                    {assessmentSubmission &&
                    assessmentSubmission.submission_status !==
                        "not_submitted" ? (
                        ""
                    ) : (
                        <ActivityDropFiles
                            disabled={isLoading || isOverDueDate}
                            setFiles={setFiles}
                        />
                    )}
                    <PrimaryButton
                        doSomething={handleSubmitActivity}
                        isDisabled={isLoading || isOverDueDate}
                        isLoading={isLoading}
                        text={
                            assessmentSubmission &&
                            assessmentSubmission.submission_status !==
                                "not_submitted"
                                ? "Unsubmit"
                                : "Submit"
                        }
                    />
                </div>
            </div>

            {fileUrl && (
                <ModalDocViewer
                    fileUrl={fileUrl}
                    onClose={closeViewFile}
                    fileName={fileName}
                />
            )}
        </>
    );
}
