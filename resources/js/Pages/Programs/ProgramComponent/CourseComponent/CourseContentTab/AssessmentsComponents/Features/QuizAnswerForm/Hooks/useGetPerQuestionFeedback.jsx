import { useState } from "react";
import axios from "axios";
import { route } from "ziggy-js";
import { displayToast } from "../../../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../../../Components/CustomToast/DefaultCustomToast";

export default function useGetPerQuestionFeedback({
    courseId,
    assessmentSubmissionId,
    questionId,
    studentQuizAnswerId,
}) {
    const [isGetFeedbackLoading, setIsGetFeedbackLoading] = useState(false);

    const handleGetFeedback = async (setFeedBack) => {
        try {
            setIsGetFeedbackLoading(true);
            const response = await axios.post(
                route("generate.question.answer.feedback", {
                    course: courseId,
                    assessmentSubmission: assessmentSubmissionId,
                    question: questionId,
                    studentQuizAnswer: studentQuizAnswerId,
                })
            );

            setFeedBack(response.data.feedback);
        } catch (error) {
            console.error(error);
            displayToast(
                <DefaultCustomToast
                    message={"Something went wrong. Please try again."}
                />,
                "error"
            );
        } finally {
            setIsGetFeedbackLoading(false);
        }
    };

    return { handleGetFeedback, isGetFeedbackLoading };
}
