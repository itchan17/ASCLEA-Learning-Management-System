import { useState } from "react";
import { PiNotebookFill } from "react-icons/pi";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import { formatFullDate } from "../../../Utils/formatFullDate";
import useArchive from "./Hooks/useArchive";

export default function ArchivedCourseCard({ courseData }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Custom hook
    const { isRestoreLoading, handleRestoreCourse } = useArchive();

    const toggleExpanded = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };
    return (
        <div className="w-full max-w-100 h-full border border-ascend-gray1 shadow-shadow1 p-5 cursor-pointer space-y-4 card-hover">
            <div className="flex items-start space-x-5 w-full">
                <div className="p-2 rounded-[100px] bg-ascend-lightblue">
                    <PiNotebookFill className="text-5xl text-ascend-blue" />
                </div>
                <div className="w-full overflow-hidden">
                    <h1 className="text-size3 font-bold truncate w-full">
                        {courseData.course_code &&
                            `${courseData.course_code} - `}{" "}
                        {courseData.course_name}
                    </h1>

                    {courseData.course_description && (
                        <p className="text-size1">
                            {isExpanded
                                ? courseData.course_description
                                : `${courseData.course_description.slice(
                                      0,
                                      80
                                  )}${
                                      courseData.course_description.length > 80
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
                        Archived by Juan Dela Cruz
                    </span>
                </div>
                <div>
                    <span className="text-size1 font-bold">
                        Permanently deletes in 30 days
                    </span>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <PrimaryButton
                    text={"Restore"}
                    btnColor={"bg-ascend-yellow"}
                    isLoading={isRestoreLoading}
                    isDisabled={isRestoreLoading}
                    doSomething={() =>
                        handleRestoreCourse(
                            courseData.program.program_id,
                            courseData.course_id
                        )
                    }
                />
                <PrimaryButton
                    text={"Delete"}
                    btnColor={"bg-ascend-red"}
                    isDisabled={isRestoreLoading}
                />
            </div>
        </div>
    );
}
