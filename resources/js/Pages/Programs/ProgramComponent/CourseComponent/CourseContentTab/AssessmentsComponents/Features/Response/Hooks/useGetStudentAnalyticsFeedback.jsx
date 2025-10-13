import { useState } from "react";
import axios from "axios";
import { route } from "ziggy-js";
import { displayToast } from "../../../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../../../Components/CustomToast/DefaultCustomToast";

export default function useGetStudentAnalyticsFeedback({
    programId,
    courseId,
    assessmentId,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerateFeedback = async (setFeedback) => {
        setError(null);
        setIsLoading(true);
        try {
            const response = await axios.post(
                route("generate.quiz.responses.feedback", {
                    program: programId,
                    course: courseId,
                    assessment: assessmentId,
                })
            );

            setFeedback(response.data.feedback);
        } catch (error) {
            setError("Something went wrong. Please try again.");
            displayToast(
                <DefaultCustomToast message="Something went wrong. Please try again." />,
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return { handleGenerateFeedback, isLoading, error };
}
