import { useState } from "react";
import { PiNotebookFill } from "react-icons/pi";
import { router, usePage } from "@inertiajs/react";
import "../../../../../css/global.css";
import { route } from "ziggy-js";
import { formatFullDate } from "../../../../Utils/formatFullDate";

export default function CourseCard({ courseDetails }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { program } = usePage().props;

    const toggleExpanded = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const handleCardClick = () => {
        router.visit(
            route("program.course.show", {
                program: program.program_id,
                course: courseDetails.course_id,
            }),
            {
                preserveScroll: false,
            }
        );
    };

    return (
        <div
            onClick={handleCardClick}
            className="w-full max-w-100 h-full border border-ascend-gray1 shadow-shadow1 p-5 cursor-pointer space-y-4 card-hover"
        >
            <div className="flex items-start space-x-5 w-full">
                <div className="p-2 rounded-[100px] bg-ascend-lightblue">
                    <PiNotebookFill className="text-5xl text-ascend-blue" />
                </div>
                <div className="w-full overflow-hidden">
                    <h1
                        title={`${
                            courseDetails.course_code
                                ? `${courseDetails.course_code} - `
                                : ""
                        } ${courseDetails.course_name}`}
                        className="text-size3 font-bold truncate w-full"
                    >
                        {courseDetails.course_code &&
                            `${courseDetails.course_code} - `}{" "}
                        {courseDetails.course_name}
                    </h1>

                    {courseDetails.course_description && (
                        <p className="text-size1">
                            {isExpanded
                                ? courseDetails.course_description
                                : `${courseDetails.course_description.slice(
                                      0,
                                      80
                                  )}${
                                      courseDetails.course_description.length >
                                      80
                                          ? "..."
                                          : ""
                                  }`}
                        </p>
                    )}
                    {courseDetails.course_description && (
                        <div className="w-full text-end">
                            {courseDetails.course_description.length > 80 && (
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
            <div className="flex flex-wrap justify-end items-center space-x-5">
                <span className="text-size1">
                    Last updated on {formatFullDate(courseDetails.updated_at)}
                </span>
                {/* <span className="bg-ascend-green px-2 py-1 text-size1 font-semibold text-ascend-white">
                    Completed
                </span> */}
            </div>
        </div>
    );
}
