import React from "react";
import BackButton from "../../../../../../../../../Components/Button/BackButton";
import { handleClickBackBtn } from "../../../../../../../../../Utils/handleClickBackBtn";
import PrimaryButton from "../../../../../../../../../Components/Button/PrimaryButton";
import EmptyState from "../../../../../../../../../Components/EmptyState/EmptyState";
import { formatDueDateTime } from "../../../../../../../../../Utils/formatDueDateTime";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function QuizSubmitted({
    courseId,
    assessmentId,
    quiz,
    assessmentSubmission,
}) {
    const handleViewResult = () => {
        router.get(
            route("quizzes.quiz.result", {
                course: courseId,
                assessment: assessmentId,
                quiz: quiz.quiz_id,
                assessmentSubmission:
                    assessmentSubmission.assessment_submission_id,
            })
        );
    };

    return (
        <div className="text-ascend-black space-y-5 font-nunito-sans bg-ascend-white">
            <div className="flex">
                <BackButton doSomething={handleClickBackBtn} />
            </div>

            <div className="w-full min-w-0 flex flex-wrap justify-between items-center gap-5">
                <h1 className="text-size6 break-words font-semibold">
                    {quiz.quiz_title}
                </h1>
                <div className="flex flex-wrap justify-between space-x-5">
                    <h1 className="font-bold">
                        Submitted on:{" "}
                        {formatDueDateTime(assessmentSubmission.submitted_at)}
                    </h1>
                </div>
            </div>

            <div className="flex flex-col justify-center space-y-5">
                <EmptyState
                    imgSrc={"/images/illustrations/completed.svg"}
                    text={`“You've already completed this quiz. You can go ahead and review your responses”`}
                />
                <div className="flex justify-center w-full">
                    <PrimaryButton
                        doSomething={handleViewResult}
                        text={"View Results"}
                    />
                </div>
            </div>
        </div>
    );
}
