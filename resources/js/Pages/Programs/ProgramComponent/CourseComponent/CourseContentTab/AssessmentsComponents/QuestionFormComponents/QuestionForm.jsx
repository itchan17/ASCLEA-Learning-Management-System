import React, { useState, useEffect, useCallback } from "react";
import SecondaryButton from "../../../../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../../../../Components/Button/PrimaryButton";
import useCreateQuizStore from "../../../../../../../Stores/Programs/CourseContent/createQuizStore";
import MultipleChoice from "./MultipleChoice";
import TrueOrFalse from "./TrueOrFalse";
import Identification from "./Identification";
import { debounce } from "lodash";
import { usePage } from "@inertiajs/react";

export default function QuestionForm({
    questionDetails,
    setQuestionDetails,
    activeForm,
    setActiveForm,
    questionIndex,
    onEdit,
    setSelectedIndex,
}) {
    const { assessmentId, quiz } = usePage().props;

    // Create Quiz Store
    // const questionDetails = useCreateQuizStore(
    //     (state) => state.questionDetails
    // );
    // const handleQuestionDetailsChange = useCreateQuizStore(
    //     (state) => state.handleQuestionDetailsChange
    // );
    const handleAddQuestion = useCreateQuizStore(
        (state) => state.handleAddQuestion
    );
    const clearQuestionDetails = useCreateQuizStore(
        (state) => state.clearQuestionDetails
    );
    const handleEditQuestion = useCreateQuizStore(
        (state) => state.handleEditQuestion
    );

    // Local States
    const [isAddOption, setIsAddOption] = useState(false);
    const [option, setOption] = useState("");
    const [timeoutId, setTimeoutId] = useState(null);
    const [isChanged, setIsChanged] = useState(false);

    // set the form title depending on the seleced question type
    const [formTitle, setFormTitle] = useState("");

    useEffect(() => {
        // set the form title basec on the currently active form
        setFormTitle(
            questionDetails.question_type === "multiple_choice"
                ? "Multiple Choice"
                : questionDetails.question_type === "true_or_false"
                ? "True or False"
                : "Identification"
        );
    }, [activeForm]);

    // const addQuestion = (key) => {
    //     // function in the createQuiz store that handle adding question
    //     handleAddQuestion();
    //     setOption("");
    //     setIsAddOption(false);
    //     setActiveForm("");
    // };

    // const cancelAddQuestion = (key) => {
    //     // this fucntion reset the questionDetails object in createQuiz store
    //     clearQuestionDetails();
    //     setActiveForm("");
    //     setSelectedIndex(null);
    // };

    const handleQuestionDetailsChange = (field, value) => {
        setIsChanged(true);
        if (field === "question") {
            setQuestionDetails((prev) => ({
                ...prev,
                [field]: value,
            }));

            // Clear the timeout if has value
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // Add value if user try to remove the questio
            if (value.trim() === "") {
                const newTimeout = setTimeout(() => {
                    setQuestionDetails((prev) => ({
                        ...prev,
                        question: "Question",
                    }));
                }, 1000);

                setTimeoutId(newTimeout);
            }
        } else if (field === "question_points") {
            setQuestionDetails((prev) => ({
                ...prev,
                [field]: value.length > 3 ? value.slice(0, 3) : value, // Limit the input to 3 char,
            }));
        } else {
            setQuestionDetails((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    // Debounce the function tha save the question updates
    const debounceUpdateQuestion = useCallback(
        debounce(async (data) => {
            try {
                console.log(data);
                const response = await axios.put(
                    route("assessment.quiz-form.question.update", {
                        assessment: assessmentId,
                        quiz: quiz.quiz_id,
                        question: data.question_id,
                    }),
                    data
                );
            } catch (error) {
                console.error(error);
            }
        }, 300),
        []
    );

    // Handles autosave of question details here
    useEffect(() => {
        console.log(questionDetails);
        console.log("THIS IS RUNNING");
        // Only run when details was truly changed by the user
        if (isChanged) {
            if (questionDetails.question.trim() !== "") {
                debounceUpdateQuestion(questionDetails);
            }
        }
    }, [questionDetails]);

    return (
        <div className="border border-ascend-gray1 p-5 gap-5 space-y-5 shadow-shadow2">
            <div className="flex justify-between items-center gap-2 text-ascend-black">
                <h1 className="text-ascend-black font-bold">{formTitle}</h1>
                <div className="flex justify-end items-center gap-2 text-ascend-black">
                    <div className="space-x-2">
                        <input
                            type="number"
                            className="border p-1 h-8 border-ascend-gray1 w-14"
                            min="0"
                            max="999"
                            onKeyDown={(e) => {
                                console.log(e.key);
                                if (e.key === "-") {
                                    e.preventDefault();
                                }
                            }}
                            value={questionDetails.question_points}
                            onChange={(e) =>
                                handleQuestionDetailsChange(
                                    "question_points",
                                    e.target.value
                                )
                            }
                        />
                        <label className="font-bold">Points</label>
                    </div>
                </div>
            </div>

            {/* Question field */}
            <div>
                <label className="font-bold">
                    Question<span className="text-ascend-red">*</span>
                </label>
                <input
                    type="text"
                    className="px-3 py-2 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                    placeholder="Type question"
                    value={questionDetails.question}
                    onChange={(e) =>
                        handleQuestionDetailsChange("question", e.target.value)
                    }
                />
            </div>

            {/* Display the form based on the question type */}
            {questionDetails.question_type === "multiple_choice" ? (
                <MultipleChoice />
            ) : questionDetails.question_type === "true_or_false" ? (
                <TrueOrFalse />
            ) : (
                <Identification
                    option={option}
                    setOption={setOption}
                    isAddOption={isAddOption}
                    setIsAddOption={setIsAddOption}
                />
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
                {/* <div className="flex justify-end gap-2 w-full sm:w-auto">
                    <SecondaryButton
                        doSomething={() => cancelAddQuestion(activeForm)}
                        text={"Cancel"}
                    />
                    {onEdit ? (
                        <PrimaryButton
                            doSomething={() => {
                                handleEditQuestion(questionIndex);
                                setActiveForm("");
                                setSelectedIndex(null);
                            }}
                            text={"Save changes"}
                        />
                    ) : (
                        <PrimaryButton
                            doSomething={() => addQuestion(activeForm)}
                            text={"Save"}
                        />
                    )}
                </div> */}
            </div>
        </div>
    );
}
