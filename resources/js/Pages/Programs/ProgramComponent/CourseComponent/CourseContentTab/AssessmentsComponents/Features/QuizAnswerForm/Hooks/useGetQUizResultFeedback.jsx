import { useState } from "react";
import axios from "axios";
import { route } from "ziggy-js";
import { displayToast } from "../../../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../../../Components/CustomToast/DefaultCustomToast";

export default function useGetQUizResultFeedback({
    courseId,
    assessmentId,
    quizId,
    assessmentSubmissionId,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const handdleGetFeedback = async () => {
        try {
            setIsLoading(true);
            const res = await axios.post(
                route("generate.quiz.result.feedback", {
                    course: courseId,
                    assessment: assessmentId,
                    quiz: quizId,
                    assessmentSubmission: assessmentSubmissionId,
                })
            );
            setFeedback(res.data.feedback);
        } catch (error) {
            setError("Something went wrong. Refresh the page to try again.");
            displayToast(
                <DefaultCustomToast
                    message={
                        "Something went wrong. Refresh the page to try again."
                    }
                />,
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };
    return { handdleGetFeedback, isLoading, feedback, error };
}
