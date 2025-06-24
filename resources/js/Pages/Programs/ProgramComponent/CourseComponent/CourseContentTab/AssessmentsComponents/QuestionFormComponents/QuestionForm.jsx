import React, { useState, useEffect } from "react";
import SecondaryButton from "../../../../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../../../../Components/Button/PrimaryButton";
import useCreateQuizStore from "../../../../../../../Stores/Programs/CourseContent/createQuizStore";
import MultipleChoice from "./MultipleChoice";

export default function MultipleChoiceForm({
    openQuestionForm,
    setOpenQuestionForm,
}) {
    // Create Quiz Store
    const questionDetails = useCreateQuizStore(
        (state) => state.questionDetails
    );
    const handleQuestionDetailsChange = useCreateQuizStore(
        (state) => state.handleQuestionDetailsChange
    );
    const handleAddQuestion = useCreateQuizStore(
        (state) => state.handleAddQuestion
    );
    const clearQuestionDetails = useCreateQuizStore(
        (state) => state.clearQuestionDetails
    );

    // Local States
    const [isAddOption, setIsAddOption] = useState(false);
    const [option, setOption] = useState("");

    const addMutipleChoiceQuestion = () => {
        handleAddQuestion();
        setOption("");
        setIsAddOption(false);
        setOpenQuestionForm({ ...openQuestionForm, multipleChoice: false });
    };

    const cancelMultipleChoiceQuestion = () => {
        clearQuestionDetails();
        setOpenQuestionForm({ ...openQuestionForm, multipleChoice: false });
    };

    useEffect(() => {
        console.log(questionDetails);
    }, [questionDetails]);
    return (
        <div className="border border-ascend-gray1 p-5 gap-5 space-y-5 shadow-shadow2">
            <div className="flex justify-between items-center gap-2 text-ascend-black">
                <h1 className="text-ascend-black font-bold">Multiple Choice</h1>
                <div className="flex justify-end items-center gap-2 text-ascend-black">
                    <div className="space-x-2">
                        <input
                            type="number"
                            className="border p-1 h-8 border-ascend-gray1 w-14"
                            min="0"
                            max="999"
                            value={questionDetails.questionPoints}
                            onChange={(e) =>
                                handleQuestionDetailsChange(
                                    "questionPoints",
                                    e.target.value
                                )
                            }
                        />
                        <label htmlFor="">Points</label>
                    </div>
                </div>
            </div>

            {/* Multiple Choice */}
            <MultipleChoice
                option={option}
                setOption={setOption}
                isAddOption={isAddOption}
                setIsAddOption={setIsAddOption}
            />
            <div className="flex flex-wrap gap-5 justify-between items-center">
                <div className="flex gap-1">
                    <input
                        type="checkbox"
                        defaultChecked={questionDetails.required}
                        className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                        onChange={(e) =>
                            handleQuestionDetailsChange(
                                "required",
                                e.target.checked
                            )
                        }
                    />
                    <span className="text-ascend-black font-bold">
                        Required
                    </span>
                </div>
                <div className="flex justify-end gap-2 w-full sm:w-auto">
                    <SecondaryButton
                        doSomething={cancelMultipleChoiceQuestion}
                        text={"Cance"}
                    />
                    <PrimaryButton
                        doSomething={addMutipleChoiceQuestion}
                        text={"Save"}
                    />
                </div>
            </div>
        </div>
    );
}
