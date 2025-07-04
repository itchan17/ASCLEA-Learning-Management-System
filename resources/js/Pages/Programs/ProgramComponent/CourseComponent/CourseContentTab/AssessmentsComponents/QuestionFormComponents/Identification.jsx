import React, { useState, useEffect } from "react";
import useCreateQuizStore from "../../../../../../../Stores/Programs/CourseContent/createQuizStore";
import SecondaryButton from "../../../../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../../../../Components/Button/PrimaryButton";
import { BiPlus } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function Identification({
    option,
    setOption,
    isAddOption,
    setIsAddOption,
}) {
    // Create quiz store
    const handleQuestionDetailsChange = useCreateQuizStore(
        (state) => state.handleQuestionDetailsChange
    );
    const questionDetails = useCreateQuizStore(
        (state) => state.questionDetails
    );
    const handleEditOption = useCreateQuizStore(
        (state) => state.handleEditOption
    );
    const handleDeleteOption = useCreateQuizStore(
        (state) => state.handleDeleteOption
    );

    const [optionToEdit, setOptionToEdit] = useState(null);

    // Functions
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const toggleAddOption = () => {
        console.log("Clicked");
        // display the input field for option
        // clear the option state everytime it is toggle
        setIsAddOption(!isAddOption);
        setOption("");
        setOptionToEdit(null);
    };

    const handleAddOption = () => {
        console.log(option);

        // pass the input option tot he function and add it to the questionChoices array
        handleQuestionDetailsChange("questionChoices", option);
        handleQuestionDetailsChange("questionAnswer", option);
        setOption("");
        toggleAddOption();
    };

    // this will run every time option was clicked to edit
    useEffect(() => {
        if (optionToEdit) {
            // this will display the option input field
            setIsAddOption(true);

            // this will set the value of the option input field
            setOption(optionToEdit.option);
        }
    }, [optionToEdit]);
    return (
        <div className="space-y-5">
            <div>
                <label>
                    Question<span className="text-ascend-red">*</span>
                </label>
                <input
                    type="text"
                    className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                    placeholder="Type question"
                    value={questionDetails.question}
                    onChange={(e) =>
                        handleQuestionDetailsChange("question", e.target.value)
                    }
                />
            </div>
            <div>
                <div>
                    {/* List Options */}
                    <label>
                        Options<span className="text-ascend-red">*</span>
                    </label>
                    <div className="space-y-5">
                        {questionDetails.questionChoices.length > 0 &&
                            questionDetails.questionChoices.map((option, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center border border-ascend-gray1 cursor-pointer min-h-12 p-2 relative bg-ascend-white"
                                    >
                                        <div className="flex items-center cursor-pointer w-full">
                                            <p className="ml-3 flex-1 min-w-0 break-words">
                                                {option}
                                            </p>
                                            <div className="flex ml-5 gap-2">
                                                <div
                                                    onClick={(e) => {
                                                        stopPropagation(e);
                                                        setOptionToEdit({
                                                            index: i,
                                                            option,
                                                        });
                                                    }}
                                                    className="p-1 rounded-3xl hover:bg-ascend-lightblue/35"
                                                >
                                                    <AiFillEdit className="shrink-0 text-size4 text-ascend-yellow" />
                                                </div>
                                                <div className="p-1 rounded-3xl hover:bg-ascend-lightblue/35">
                                                    <AiFillDelete
                                                        onClick={(e) => {
                                                            stopPropagation(e);
                                                            handleDeleteOption(
                                                                i,
                                                                option
                                                            );
                                                        }}
                                                        className="shrink-0 text-size4 text-ascend-red"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        {!isAddOption ? (
                            <SecondaryButton
                                doSomething={toggleAddOption}
                                icon={<BiPlus />}
                                text={"Add option"}
                            />
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={option}
                                    className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                                    placeholder="Type option"
                                    onChange={(e) => setOption(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <SecondaryButton
                                        doSomething={toggleAddOption}
                                        text={"Cancel"}
                                    />
                                    {optionToEdit ? (
                                        <PrimaryButton
                                            doSomething={() =>
                                                handleEditOption(
                                                    optionToEdit,
                                                    setOptionToEdit,
                                                    setOption,
                                                    toggleAddOption,
                                                    option
                                                )
                                            }
                                            text={"Edit"}
                                        />
                                    ) : (
                                        <PrimaryButton
                                            doSomething={handleAddOption}
                                            text={"Add"}
                                        />
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
