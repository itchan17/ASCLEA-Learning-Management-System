import { useState } from "react";
import axios from "axios";
import { route } from "ziggy-js";
import { displayToast } from "../../../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../../../Components/CustomToast/DefaultCustomToast";
import { router } from "@inertiajs/react";

export default function useGetPerQuestionFeedback({
    courseId,
    assessmentSubmissionId,
    questionId,
    studentQuizAnswerId,
}) {
    const [isGetFeedbackLoading, setIsGetFeedbackLoading] = useState(false);

    const handleGetFeedback = async () => {
        setIsGetFeedbackLoading(true);
        router.post(
            route("generate.question.answer.feedback", {
                course: courseId,
                assessmentSubmission: assessmentSubmissionId,
                question: questionId,
                studentQuizAnswer: studentQuizAnswerId,
            }),
            {},
            {
                showProgress: false,
                only: ["questions"],
                preserveScroll: true,
                onError: () => {
                    displayToast(
                        <DefaultCustomToast
                            message={"Something went wrong. Please try again."}
                        />,
                        "error"
                    );
                },
                onFinish: () => {
                    setIsGetFeedbackLoading(false);
                },
            }
        );
    };

    return { handleGetFeedback, isGetFeedbackLoading };
}
