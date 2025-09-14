import { useState, useMemo, useEffect } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { debounce } from "lodash";
import { displayToast } from "../../../../../../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../../../../../../Components/CustomToast/DefaultCustomToast";
import useQuizAnswerStore from "../Stores/quizAnswerStore";
import saveAnswer from "../Services/quizAnswerService";

export default function useQuizAnswerForm() {
    const [questionRequiredError, setQuestionRequiredError] = useState(null);

    // Quiz answer store
    const updateStudentAnswer = useQuizAnswerStore(
        (state) => state.updateStudentAnswer
    );
    const studentAnswers = useQuizAnswerStore((state) => state.studentAnswers);
    const isLoading = useQuizAnswerStore((state) => state.isLoading);
    const setIsLoading = useQuizAnswerStore((state) => state.setIsLoading);

    // This is used for navigating the pagination of quiz answer form
    // Has a parameter of page for getting the next or prev page
    // preserveUrl is used to prevent displaying the current page in the url
    const navigateQuizAnswerForm = ({
        courseId,
        assessmentId,
        quizId,
        page,
    }) => {
        setIsLoading(true);
        router.visit(
            route("assessment.quizzes.quiz", {
                course: courseId,
                assessment: assessmentId,
                quiz: quizId,
                page: page,
            }),
            {
                onFinish: setIsLoading(false),
                onError: setIsLoading(false),
            }
        );
    };

    // WEe have to validate if user fill all the required questiosns
    // before navigating to next page of the quiz
    const handleValidateRequiredQuestion = ({
        courseId,
        assessmentId,
        quizId,
        page,
    }) => {
        if (!isLoading) {
            router.post(
                route("assessment.quiz.validate", {
                    course: courseId,
                    assessment: assessmentId,
                    quiz: quizId,
                }),
                { page, answers: studentAnswers },
                {
                    only: ["questions"],
                    onError: (e) => {
                        console.error(e);
                        setQuestionRequiredError(e);
                        displayToast(
                            <DefaultCustomToast
                                message={"Some required questions are missing."}
                            />,
                            "error"
                        );
                    },
                    onSuccess: () => {
                        setQuestionRequiredError(null);
                    },
                }
            );
        }
    };

    const handleAnswerQuestion = (
        answer,
        setAnswer,
        courseId,
        assessmentSubmissionId,
        questionId
    ) => {
        setAnswer(answer);

        debouncedSaveAnswer(
            answer,
            courseId,
            assessmentSubmissionId,
            questionId
        );
    };

    const debouncedSaveAnswer = useMemo(
        () =>
            debounce(
                async (
                    answer,
                    courseId,
                    assessmentSubmissionId,
                    questionId
                ) => {
                    try {
                        setIsLoading(true);

                        const response = await saveAnswer({
                            courseId: courseId,
                            assessmentSubmissionId: assessmentSubmissionId,
                            questionId: questionId,
                            answer: answer,
                        });

                        console.log(response);
                        updateStudentAnswer(questionId, response.data.answer);
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setIsLoading(false);
                    }
                },
                300
            ),
        []
    );

    useEffect(() => {
        return () => {
            debouncedSaveAnswer.cancel();
        };
    }, [debouncedSaveAnswer]);

    const submitQuiz = ({
        courseId,
        assessmentId,
        quizId,
        assessmentSubmissionId,
    }) => {
        if (!isLoading) {
            router.post(
                route("quizzes.quiz.submit", {
                    course: courseId,
                    assessment: assessmentId,
                    quiz: quizId,
                    assessmentSubmission: assessmentSubmissionId,
                }),
                { answers: studentAnswers },
                {
                    only: ["questions"],
                    onError: (e) => {
                        console.error(e);
                        setQuestionRequiredError(e);
                        displayToast(
                            <DefaultCustomToast
                                message={"Some required questions are missing."}
                            />,
                            "error"
                        );
                    },
                    onSuccess: () => {
                        setQuestionRequiredError(null);
                    },
                }
            );
        }
    };

    return {
        navigateQuizAnswerForm,
        isLoading,
        handleAnswerQuestion,
        debouncedSaveAnswer,
        handleValidateRequiredQuestion,
        questionRequiredError,
        submitQuiz,
    };
}
