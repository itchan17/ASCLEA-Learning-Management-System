import React from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function useQuizResult() {
    const handleViewResult = (
        courseId,
        assessmentId,
        quizId,
        assessmentSubmissionId
    ) => {
        router.visit(
            route("quizzes.quiz.result", {
                course: courseId,
                assessment: assessmentId,
                quiz: quizId,
                assessmentSubmission: assessmentSubmissionId,
            }),
            { replace: true }
        );
    };
    return { handleViewResult };
}
