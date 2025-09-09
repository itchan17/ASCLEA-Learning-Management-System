import React from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function useQuizAnswerForm() {
    const navigateQuizAnswerForm = (assessmentId, quizId, setIsLoading) => {
        setIsLoading(true);
        router.visit(
            route("assessment.quizzes.quiz", {
                assessment: assessmentId,
                quiz: quizId,
            }),
            {
                onFinish: setIsLoading(false),
                onError: setIsLoading(false),
            }
        );
    };
    return { navigateQuizAnswerForm };
}
