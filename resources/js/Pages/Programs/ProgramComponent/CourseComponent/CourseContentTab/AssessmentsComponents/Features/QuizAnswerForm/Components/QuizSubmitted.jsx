import React from "react";
import PrimaryButton from "../../../../../../../../../Components/Button/PrimaryButton";
import EmptyState from "../../../../../../../../../Components/EmptyState/EmptyState";
import { formatDueDateTime } from "../../../../../../../../../Utils/formatDueDateTime";
import useQuizResult from "../Hooks/useQuizResult";

export default function QuizSubmitted({
    courseId,
    assessmentId,
    quiz,
    assessmentSubmission,
}) {
    // Custom hook
    const { handleViewResult } = useQuizResult();

    return (
        <div className="text-ascend-black space-y-5 font-nunito-sans bg-ascend-white px-5 lg:px-[100px] py-5">
            <div className="w-full min-w-0 flex flex-wrap justify-between items-center gap-5">
                <h1 className="text-size6 font-semibold break-all">
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
                    text={
                        quiz && quiz.show_answers_after
                            ? `“You've already completed this quiz. You can go ahead and review your responses”`
                            : `“You've already completed this quiz.”`
                    }
                />

                {quiz && quiz.show_answers_after && (
                    <div className="flex justify-center w-full">
                        <PrimaryButton
                            doSomething={() =>
                                handleViewResult(
                                    courseId,
                                    assessmentId,
                                    quiz.quiz_id,
                                    assessmentSubmission.assessment_submission_id
                                )
                            }
                            text={"View Results"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

QuizSubmitted.layout = null;
