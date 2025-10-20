import { useState } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function useUpdateStudentAnswerStatus({
    courseId,
    assessmentSubmissionId,
    questionId,
    studentQuizAnswerId,
}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = (isCorrect) => {
        if (studentQuizAnswerId) {
            setIsLoading(true);
            router.put(
                route("assessment.quiz.question.answer.update", {
                    course: courseId,
                    assessmentSubmission: assessmentSubmissionId,
                    question: questionId,
                    studentQuizAnswer: studentQuizAnswerId,
                }),
                { isCorrect },
                {
                    showProgress: false,
                    preserveScroll: true,
                    only: ["questions", "assessmentSubmission"],
                    onFinish: () => setIsLoading(false),
                }
            );
        }
    };

    return { handleUpdate, isLoading };
}
