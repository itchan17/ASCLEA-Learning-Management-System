import React from "react";
import PrimaryButton from "../../../../../../../../../Components/Button/PrimaryButton";
import ActivityDropFiles from "./ActivityDropFiles";
import Loader from "../../../../../../../../../Components/Loader";
import File from "../../../../File";
import useUploadActivityFiles from "../Hooks/useUploadActivityFiles";
import { usePage } from "@inertiajs/react";

export default function AcitivityMyWork() {
    const { courseId, assessment, assessmentSubmission } = usePage().props;
    // Custom hooks
    const { files, setFiles, isLoading } = useUploadActivityFiles({
        courseId,
        assessmentId: assessment.assessment_id,
    });

    return (
        <>
            <h1 className="font-bold">My Work</h1>
            {assessmentSubmission &&
                assessmentSubmission.activity_files.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {/* display the uploaded file */}
                        {assessmentSubmission.activity_files.map((file) => (
                            <File withRemove={true} fileName={file.file_name} />
                        ))}

                        {/* Displays uploading of file */}
                        {files.length > 0 &&
                            isLoading &&
                            files.map((file) => (
                                <div className="relative">
                                    <File
                                        withRemove={true}
                                        fileName={file.name}
                                    />

                                    <div className="absolute inset-0 bg-ascend-lightblue/30 z-10 flex items-center justify-center">
                                        <span className="text-white font-medium">
                                            <Loader color="text-ascend-blue" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="flex flex-col gap-2">
                    <ActivityDropFiles setFiles={setFiles} />
                    <PrimaryButton text={"Submit"} />
                </div>
            </div>
        </>
    );
}
