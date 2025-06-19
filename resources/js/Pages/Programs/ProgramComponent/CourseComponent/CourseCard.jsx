import { useState } from "react";
import { PiNotebookFill } from "react-icons/pi";
import { router } from "@inertiajs/react";
import "../../../../../css/global.css";
import { useRoute } from "ziggy-js";

export default function CourseCard({
    courseId,
    courseCode,
    courseName,
    courseDescription,
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const route = useRoute();

    const toggleExpanded = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const handleCardClick = () => {
        router.visit(route("program.course.view", { programId: 1, courseId }), {
            preserveScroll: false,
        });
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
                    <h1 className="text-size3 font-bold truncate w-full">
                        {courseCode && `${courseCode} - `} {courseName}
                    </h1>

                    {courseDescription && (
                        <p className="text-size1">
                            {isExpanded
                                ? courseDescription
                                : `${courseDescription.slice(0, 80)}${
                                      courseDescription.length > 80 && "..."
                                  }`}
                        </p>
                    )}
                    {courseDescription && (
                        <div className="w-full text-end">
                            {courseDescription.length > 80 && (
                                <span
                                    onClick={toggleExpanded}
                                    className="text-size1 font-bold"
                                >
                                    {isExpanded ? " See less" : "See more"}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap justify-between items-center space-x-5">
                <span className="text-size1">
                    Last updated on March 29, 2025
                </span>
                <span className="bg-ascend-green px-2 py-1 text-size1 font-semibold text-ascend-white">
                    Completed
                </span>
            </div>
        </div>
    );
}
