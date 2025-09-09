import React from "react";
import QuizAnswerFormNav from "./QuizAnswerFormNav";
import QuestionItem from "./QuestionItem";
import ReactQuill from "react-quill-new";
import DOMPurify from "dompurify";
import { hasText } from "../../../../../../../../../Utils/hasText";
import PrimaryButton from "../../../../../../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../../../../../../Components/Button/SecondaryButton";
import useQuizAnswerForm from "../Hooks/useQuizAnswerForm";

export default function QuizAnswerForm({ assessmentId, quiz, questions }) {
    // Custom hook
    const { navigateQuizAnswerForm } = useQuizAnswerForm();

    return (
        <div className="font-nunito-sans">
            <QuizAnswerFormNav />

            <main className="flex justify-center px-5 pb-5 lg:px-[150px]">
                <div className="w-full max-w-235 space-y-5">
                    <div className="w-full space-y-5 border border-ascend-gray1 shadow-shadow1 p-5">
                        <h1 className="font-bold text-size6">
                            {quiz.quiz_title}
                        </h1>
                        {hasText(quiz.quiz_description) && (
                            <ReactQuill
                                value={DOMPurify.sanitize(
                                    quiz.quiz_description
                                )}
                                readOnly={true}
                                theme={"bubble"}
                            />
                        )}
                    </div>

                    {/* Questions here */}

                    {questions &&
                        questions.data.length > 0 &&
                        questions.data.map((question) => (
                            <QuestionItem
                                key={question.question_id}
                                questionDetails={question}
                            />
                        ))}

                    <div className="flex justify-end space-x-2 w-full">
                        {questions.current_page > 1 && (
                            <SecondaryButton
                                doSomething={() =>
                                    navigateQuizAnswerForm({
                                        assessmentId: assessmentId,
                                        quizId: quiz.quiz_id,
                                        page: questions.current_page - 1,
                                        preserveUrl: true,
                                    })
                                }
                                text={"Back"}
                            />
                        )}
                        <PrimaryButton
                            doSomething={() =>
                                navigateQuizAnswerForm({
                                    assessmentId: assessmentId,
                                    quizId: quiz.quiz_id,
                                    page: questions.current_page + 1,
                                    preserveUrl: true,
                                })
                            }
                            text={
                                questions.current_page < questions.last_page
                                    ? "Next"
                                    : "Submit"
                            }
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

QuizAnswerForm.layout = null;
