import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import File from "../../../../File";
import useActivitySubmission from "../Hooks/useActivitySubmission";
import { usePage } from "@inertiajs/react";
import ModalDocViewer from "../../../../../../../../../Components/ModalDocViewer";

export default function ResponseAttachedFiles({
    activityFiles,
    assessmentSubmissionId,
}) {
    const { courseId, assessment } = usePage().props;

    // Custom hooks
    const { handleViewingFile, fileName, fileUrl, closeViewFile } =
        useActivitySubmission({
            courseId,
            assessmentId: assessment.assessment_id,
        });
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleShowAttachments = () => {
        setIsOpen(!isOpen);
    };

    return (
        <tr>
            <td colSpan={5}>
                <div className="w-full space-y-2">
                    <div
                        onClick={handleToggleShowAttachments}
                        className="group flex items-center gap-1 font-bold cursor-pointer hover:underline hover:text-ascend-blue transition-all duration-300 w-fit"
                    >
                        <h1>
                            {isOpen ? "Hide attachments" : "Show attachments"}
                        </h1>
                        <MdKeyboardArrowDown
                            className={`text-ascend-black group-hover:text-ascend-blue text-size4 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : "rotate-0"
                            }`}
                        />
                    </div>

                    {/* Animated container */}
                    <div
                        className={`origin-top transition-transform duration-500 ease-in-out ${
                            isOpen
                                ? "scale-y-100 opacity-100"
                                : "h-0 scale-y-0 opacity-0"
                        } grid grid-cols-2 lg:grid-cols-3 gap-2`}
                    >
                        {activityFiles.map((file) => (
                            <File
                                onClick={() =>
                                    handleViewingFile(
                                        assessmentSubmissionId,
                                        file.activity_file_id,
                                        file.file_name
                                    )
                                }
                                key={file.activity_file_id}
                                fileName={file.file_name}
                            />
                        ))}
                    </div>
                </div>

                {fileUrl && (
                    <ModalDocViewer
                        fileUrl={fileUrl}
                        onClose={closeViewFile}
                        fileName={fileName}
                    />
                )}
            </td>
        </tr>
    );
}
