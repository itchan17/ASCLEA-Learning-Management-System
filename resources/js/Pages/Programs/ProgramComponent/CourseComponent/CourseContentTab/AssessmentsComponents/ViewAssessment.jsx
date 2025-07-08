import React, { useEffect, useState } from "react";
import BackButton from "../../../../../../Components/Button/BackButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import "../../../../../../../css/quillTextEditor.css";
import DOMPurify from "dompurify";
import "../../../../../../../css/global.css";
import File from "../File";
import Quiz from "./Quiz";
import { handleClickBackBtn } from "../../../../../../Utils/handleClickBackBtn";
import { router, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import useAssessmentsStore from "../../../../../../Stores/Programs/CourseContent/assessmentsStore";
import { formatFullDate } from "../../../../../../Utils/formatFullDate";
import { formatDueDateTime } from "../../../../../../Utils/formatDueDateTime";

export default function ViewAssessment() {
    const route = useRoute();

    // Assessment store
    const assessmentList = useAssessmentsStore((state) => state.assessmentList);

    const [assessmentDetails, setAssessmentDetails] = useState(null);

    // get the id from url
    const { programId, courseId, assessmentId } = usePage().props;

    // temporarily get the data of slected assessment
    useEffect(() => {
        // check if id is true
        if (assessmentId) {
            // find the assessment details in asssessment list based on the id in url
            // this in temporary only as there's currently data passed from backend
            // the data will come from the backend and here's we're it will be set
            const details = assessmentList.find(
                (detail) => detail.id === Number(assessmentId)
            );

            // set the data
            setAssessmentDetails(details);
        }
    }, [assessmentId]);

    const clickViewResponses = () => {
        router.visit(
            route("program.course.assessment.responses", {
                programId,
                courseId,
                assessmentId,
            })
        );

        // Close the dropdown after clicked
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };

    return (
        <div className="text-ascend-black space-y-5 font-nunito-sans">
            <div className="flex">
                <BackButton doSomething={handleClickBackBtn} />
            </div>
            <div className="space-y-5 pb-5 border-b border-ascend-gray1">
                <div className="flex items-start gap-2 md:gap-20">
                    <div className="w-full min-w-0">
                        <h1 className="text-size6 break-words font-semibold">
                            {assessmentDetails?.assessmentTitle}
                        </h1>
                        <span className="text-size1">
                            {assessmentDetails?.userPosted} |{" "}
                            {formatFullDate(
                                assessmentDetails?.assessmentPostDate
                            )}
                        </span>
                    </div>

                    <div className="dropdown dropdown-end cursor-pointer ">
                        <div
                            tabIndex={0}
                            role="button"
                            className="rounded-4xl p-3 hover:bg-ascend-lightblue transition-all duration-300"
                        >
                            <BsThreeDotsVertical className="text-size5 text-ascend-black" />
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-ascend-white w-42 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                        >
                            <li onClick={clickViewResponses}>
                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    View responses
                                </a>
                            </li>
                            <li>
                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Edit assessment
                                </a>
                            </li>
                            <li>
                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Archive assessment
                                </a>
                            </li>
                            <li>
                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Reset assessment
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {assessmentDetails && (
                    <ReactQuill
                        value={DOMPurify.sanitize(
                            assessmentDetails.assessmentDescription
                        )}
                        readOnly={true}
                        theme={"bubble"}
                    />
                )}
            </div>
            <div className="flex flex-wrap justify-between">
                <h1 className="font-bold">
                    Possible Points: {assessmentDetails?.assessmentPoints}
                </h1>
                <h1 className="font-bold">
                    {assessmentDetails?.assessmentDueDateTime &&
                        `Due on
                    ${formatDueDateTime(
                        assessmentDetails?.assessmentDueDateTime
                    )}`}
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {assessmentDetails &&
                assessmentDetails.assessmentType === "quiz" ? (
                    <Quiz quizDetails={assessmentDetails.assessmentQuiz} />
                ) : (
                    <File />
                )}
            </div>
        </div>
    );
}
