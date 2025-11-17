import { useState, useEffect } from "react";
import { PiNotebookFill } from "react-icons/pi";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import { formatFullDate } from "../../../Utils/formatFullDate";
import useArchive from "./Hooks/useArchive";
import { getRemainingDays } from "../../../Utils/getRemainingDays";
import AlertModal from "../../../Components/AlertModal";

export default function ArchivedCourseCard({ courseData }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // States for alert modal
    const [openAlerModal, setOpenAlertModal] = useState(false);
    const [action, setAction] = useState(null);

    // Custom hook
    const { isLoading, handleRestoreCourse, handleForceDeleteCourse } =
        useArchive();

    const toggleExpanded = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const handleActionClick = (action) => {
        setAction(action);
        setOpenAlertModal(true);
    };

    useEffect(() => {
        console.log(action);
        console.log(openAlerModal);
    }, [openAlerModal, action]);

    return (
        <>
            {/* Display alert modal */}
            {openAlerModal && (
                <AlertModal
                    title={
                        action === "restore"
                            ? "Restore Course"
                            : "Permanently Delete Course"
                    }
                    description={
                        action === "restore"
                            ? "Are you sure you want to restore this course?"
                            : "Are you sure you want to permanently delete this course? This action cannot be undone."
                    }
                    closeModal={() => setOpenAlertModal(false)}
                    onConfirm={() => {
                        if (action === "restore") {
                            handleRestoreCourse(
                                courseData.program.program_id,
                                courseData.course_id
                            );
                        } else {
                            handleForceDeleteCourse(
                                courseData.program.program_id,
                                courseData.course_id
                            );
                        }
                    }}
                    isLoading={isLoading}
                />
            )}

            <div className="w-full max-w-100 h-full border border-ascend-gray1 shadow-shadow1 p-5 cursor-pointer space-y-4 card-hover">
                <div className="flex items-start space-x-5 w-full">
                    <div className="p-2 rounded-[100px] bg-ascend-lightblue">
                        <PiNotebookFill className="text-5xl text-ascend-blue" />
                    </div>
                    <div className="w-full overflow-hidden">
                        <h1
                            title={`${
                                courseData.course_code
                                    ? `${courseData.course_code} - `
                                    : ""
                            } ${courseData.course_name}`}
                            className="text-size3 font-bold truncate w-full"
                        >
                            {courseData.course_code &&
                                `${courseData.course_code} - `}{" "}
                            {courseData.course_name}
                        </h1>
                        <span className="font-semibold">
                            Pogram: {courseData.program.program_name}
                        </span>
                        {courseData.course_description && (
                            <p className="text-size1 mt-2">
                                {isExpanded
                                    ? courseData.course_description
                                    : `${courseData.course_description.slice(
                                          0,
                                          80
                                      )}${
                                          courseData.course_description.length >
                                          80
                                              ? "..."
                                              : ""
                                      }`}
                            </p>
                        )}
                        {courseData.course_description && (
                            <div className="w-full text-end">
                                {courseData.course_description.length > 80 && (
                                    <span
                                        onClick={toggleExpanded}
                                        className="text-size1 font-bold"
                                    >
                                        {isExpanded ? "See less" : "See more"}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex  items-center">
                    <div className="flex flex-wrap justify-between items-center space-x-5">
                        <span className="text-size1">
                            Arhived on {formatFullDate(courseData.deleted_at)}
                        </span>
                        <span className="text-size1">
                            Archived by{" "}
                            {courseData.archived_by
                                ? `${courseData.archived_by.first_name} ${courseData.archived_by.last_name}`
                                : courseData.program.archived_by
                                ? `${courseData.program.archived_by.first_name} ${courseData.program.archived_by.last_name}`
                                : "N/A"}
                        </span>
                    </div>
                    <div>
                        <span className="text-size1 font-bold">
                            Permanently deletes in{" "}
                            {getRemainingDays(courseData.deleted_at, 30)}d
                        </span>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <PrimaryButton
                        text={"Restore"}
                        btnColor={"bg-ascend-yellow"}
                        doSomething={() => handleActionClick("restore")}
                    />
                    <PrimaryButton
                        text={"Delete"}
                        btnColor={"bg-ascend-red"}
                        doSomething={() => handleActionClick("delete")}
                    />
                </div>
            </div>
        </>
    );
}
