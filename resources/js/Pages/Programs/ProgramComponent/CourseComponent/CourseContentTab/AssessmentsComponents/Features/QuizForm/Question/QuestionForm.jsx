import { useState, useEffect } from "react";
import MultipleChoice from "./Types/MultipleChoice/MultipleChoice";
import TrueOrFalse from "./Types/TrueOrFalse/TrueOrFalse";
import Identification from "./Types/Identification/Identification";
import { usePage } from "@inertiajs/react";
import useQuestionStore from "./Stores/questionStore";
import useQuestion from "./Hooks/useQuestion";
import useQuestionAutoSave from "./Hooks/useQuestionAutoSave";
import useQuizStore from "../Stores/quizStore";

export default function QuestionForm() {
    const { assessmentId, quiz } = usePage().props;

    // Question store
    const questionDetails = useQuestionStore((state) => state.questionDetails);

    // Custom hooks
    const { handleQuestionDetailsChange, isQuestionDetailsChanged } =
        useQuestion({
            assessmentId,
            quizId: quiz.quiz_id,
        });
    const { debounceUpdateQuestion } = useQuestionAutoSave({
        assessmentId,
        quizId: quiz.quiz_id,
    });

    // set the form title depending on the seleced question type
    const [formTitle, setFormTitle] = useState(
        questionDetails.question_type === "multiple_choice"
            ? "Multiple Choice"
            : questionDetails.question_type === "true_or_false"
            ? "True or False"
            : "Identification"
    );

    // Handles autosave of question details here
    useEffect(() => {
        // Only run when details was truly changed by the user
        if (isQuestionDetailsChanged && questionDetails.question_id) {
            // If the question is empty update it with the default value
            let updatedQuestionDetails = questionDetails;

            if (questionDetails.question.trim() === "") {
                updatedQuestionDetails = {
                    ...updatedQuestionDetails,
                    question: "Question",
                };
            }
            if (questionDetails.question_points.toString().trim() === "") {
                updatedQuestionDetails = {
                    ...updatedQuestionDetails,
                    question_points: 0,
                };
            }

            debounceUpdateQuestion(updatedQuestionDetails);
        }
    }, [questionDetails]);

    return (
        <div className="border border-ascend-gray1 p-5 gap-5 space-y-5 shadow-shadow1">
            <div className="flex justify-between items-center gap-2 text-ascend-black">
                <h1 className="text-ascend-black font-bold">{formTitle}</h1>
                <div className="flex justify-end items-center gap-2 text-ascend-black">
                    <div className="space-x-2">
                        <input
                            type="number"
                            className="border pl-3 py-2 border-ascend-gray1 w-14"
                            min="0"
                            max="999"
                            onKeyDown={(e) => {
                                console.log(e.length);
                                if (
                                    e.key === "-" ||
                                    e.key === "e" ||
                                    e.key === "+"
                                ) {
                                    e.preventDefault(); // prevent invalid characters
                                }
                            }}
                            value={questionDetails.question_points}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 3) {
                                    handleQuestionDetailsChange(
                                        "question_points",
                                        value
                                    );
                                }
                            }}
                        />
                        <label className="font-bold">Points</label>
                    </div>
                </div>
            </div>

            {/* Question field */}
            <div>
                <label className="font-bold">Question</label>
                <input
                    type="text"
                    className="px-3 py-2 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                    placeholder="Type question"
                    value={questionDetails.question}
                    autoFocus
                    onChange={(e) =>
                        handleQuestionDetailsChange("question", e.target.value)
                    }
                    onBlur={(e) => {
                        if (e.target.value.trim() === "") {
                            handleQuestionDetailsChange("question", "Question");
                        }
                    }}
                />
            </div>

            {/* Display the form based on the question type */}
            {questionDetails.question_type === "multiple_choice" ? (
                <MultipleChoice />
            ) : questionDetails.question_type === "true_or_false" ? (
                <TrueOrFalse />
            ) : (
                <Identification />
            )}
            <div className="flex flex-wrap gap-5 justify-between items-center">
                <div className="flex gap-1">
                    <input
                        type="checkbox"
                        defaultChecked={questionDetails.is_required}
                        className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                        onChange={(e) =>
                            handleQuestionDetailsChange(
                                "is_required",
                                e.target.checked
                            )
                        }
                    />
                    <span className="text-ascend-black font-bold">
                        Required
                    </span>
                </div>
            </div>
        </div>
    );
}
