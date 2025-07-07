import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SiGoogleforms } from "react-icons/si";
import { router, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { formatDueDateTime } from "../../../../../../Utils/formatDueDateTime";
import { formatFullDate } from "../../../../../../Utils/formatFullDate";

export default function AssessmentItem({ assessmentDetails }) {
    const route = useRoute();

    // get the id from url
    const { programId, courseId } = usePage().props;

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleCardClick = () => {
        router.visit(
            route("program.course.assessment.view", {
                programId,
                courseId,
                assessmentId: assessmentDetails.id,
            }),
            {
                preserveScroll: false,
            }
        );
    };

    const handleQuizClick = () => {
        router.visit(
            route("program.course.quiz-form.edit", {
                programId,
                courseId,
                quizFormId: assessmentDetails.assessmentQuiz.id,
            })
        );
    };

    return (
        <div
            onClick={handleCardClick}
            className="flex flex-col justify-between border border-ascend-gray1 shadow-shadow1 p-5 space-y-5 cursor-pointer card-hover"
        >
            <div className="flex items-center gap-2 md:gap-20">
                <h1 className="flex-1 min-w-0 text-size2 truncate font-bold">
                    {assessmentDetails.assessmentType === "quiz"
                        ? "New Quiz"
                        : "New Activity"}
                </h1>

                <div className="h-8 flex items-center">
                    <div
                        onClick={stopPropagation}
                        className="dropdown dropdown-end cursor-pointer"
                    >
                        <div
                            tabIndex={0}
                            role="button"
                            className="rounded-4xl p-1 -mr-1 hover:bg-ascend-lightblue transition-all duration-300"
                        >
                            <BsThreeDotsVertical className="text-size3" />
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content menu space-y-2 font-bold bg-ascend-white w-45 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                        >
                            <li>
                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Edit assessment
                                </a>
                            </li>
                            <li>
                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Archive assessment
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="flex-1 min-w-0 text-size4 truncate font-bold">
                    {assessmentDetails.assessmentTitle}
                </h1>
                <span className="text-size1">
                    {assessmentDetails.assessmentDueDateTime
                        ? `Due on ${formatDueDateTime(
                              assessmentDetails.assessmentDueDateTime
                          )}`
                        : null}
                </span>
            </div>

            <div
                onClick={(e) => {
                    stopPropagation(e);
                    handleQuizClick();
                }}
                className="flex h-15 items-center space-x-4 p-2 border border-ascend-gray1 bg-ascend-white hover-change-bg-color cursor-pointer"
            >
                <div className="w-full flex overflow-hidden font-semibold font-nunito-sans text-ascebd-black">
                    <SiGoogleforms className="text-size5 text-ascend-blue" />
                    <h4 className="ml-2 truncate">
                        {assessmentDetails.assessmentQuiz.quizTitle}
                    </h4>
                </div>
            </div>

            <div className="flex flex-wrap-reverse justify-between items-baseline font-nunito-sans gap-2">
                <span className="text-size1">
                    Posted on{" "}
                    {formatFullDate(assessmentDetails.assessmentPostDate)}
                </span>
                <span className="font-bold">
                    {assessmentDetails.userPosted}
                </span>
            </div>
        </div>
    );
}
