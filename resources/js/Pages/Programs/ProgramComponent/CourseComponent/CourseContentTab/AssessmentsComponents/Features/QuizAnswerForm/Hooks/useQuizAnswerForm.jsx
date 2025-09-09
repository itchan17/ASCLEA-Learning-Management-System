import { useState } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function useQuizAnswerForm() {
    const [isLoading, setIsLoading] = useState(false);

    // This is used for navigating the pagination of quiz answer form
    // Has a parameter of page for getting the next or prev page
    // preserveUrl is used to prevent displaying the current page in the url
    const navigateQuizAnswerForm = ({
        assessmentId,
        quizId,
        page,
        preserveUrl = false,
    }) => {
        setIsLoading(true);
        router.visit(
            route("assessment.quizzes.quiz", {
                assessment: assessmentId,
                quiz: quizId,
                page: page,
            }),
            {
                preserveUrl: preserveUrl,
                onFinish: setIsLoading(false),
                onError: setIsLoading(false),
            }
        );
    };
    return { navigateQuizAnswerForm, isLoading };
}
