import React, { useState, useEffect } from "react";
import useCreateQuizStore from "../../../../../../../Stores/Programs/CourseContent/createQuizStore";
import SecondaryButton from "../../../../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../../../../Components/Button/PrimaryButton";
import { BiPlus } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function MultipleChoice({
    option,
    setOption,
    isAddOption,
    setIsAddOption,
}) {
    // Create Quiz Store
    const questionDetails = useCreateQuizStore(
        (state) => state.questionDetails
    );
    const handleQuestionDetailsChange = useCreateQuizStore(
        (state) => state.handleQuestionDetailsChange
    );
    const handleEditOption = useCreateQuizStore(
        (state) => state.handleEditOption
    );
    const handleDeleteOption = useCreateQuizStore(
        (state) => state.handleDeleteOption
    );

    // Local State
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

        // pass the input option tot he function and add it to the question_choices array
        handleQuestionDetailsChange("question_choices", option);
        setOption("");
        toggleAddOption();
    };

    const setCorrectAnswer = (option) => {
        console.log(option);
        console.log(questionDetails.questionAnswer.includes(option));
        // check first if the selected option is already set as correct if not unset the option as inncorrect
        if (questionDetails.questionAnswer.includes(option)) {
            let newQuestionAnswer = questionDetails.questionAnswer.filter(
                (ans) => ans !== option
            );
            handleQuestionDetailsChange("questionAnswer", newQuestionAnswer);
        } else {
            // add the selected option to the array of questionAnswer
            handleQuestionDetailsChange("questionAnswer", option);
        }
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
                {/* List Options */}
                {questionDetails.question_choices.length > 0 && (
                    <label className="font-bold">
                        Options
                        <span className="text-size1">
                            (Click option/s to set correct asnwer)
                        </span>
                        <span className="text-ascend-red ml-1">*</span>
                    </label>
                )}

                <div className="space-y-5">
                    {questionDetails.question_choices.length > 0 &&
                        questionDetails.question_choices.map((option, i) => {
                            let isCorrect =
                                questionDetails.questionAnswer.includes(option);
                            console.log(optionToEdit);
                            return optionToEdit && optionToEdit.index == i ? (
                                <div className="flex gap-1 ">
                                    <div
                                        onClick={() => setCorrectAnswer(option)}
                                        className={`flex items-center px-3 py-2 border border-ascend-gray1 cursor-pointer ${
                                            isCorrect
                                                ? "bg-ascend-lightgreen"
                                                : "bg-ascend-white"
                                        }`}
                                    >
                                        <div
                                            className={`flex items-center justify-center bg-ascend-white rounded-full w-5 h-5 shrink-0 ${
                                                isCorrect
                                                    ? "border-ascend-green border-2"
                                                    : "border-ascend-gray2 border"
                                            } transition-all duration-300`}
                                        >
                                            <div
                                                className={`rounded-full shrink-0 ${
                                                    isCorrect
                                                        ? "bg-ascend-green w-3 h-3"
                                                        : "bg-ascend-white w-0 h-0 "
                                                } transition-all duration-300`}
                                            />
                                        </div>
                                    </div>
                                    <input
                                        key={i}
                                        type="text"
                                        value={option}
                                        className="w-full border border-ascend-gray1 focus:outline-ascend-blue px-3 py-2"
                                        placeholder="Type option"
                                        onChange={(e) =>
                                            setOption(e.target.value)
                                        }
                                    />
                                </div>
                            ) : (
                                <div
                                    key={i}
                                    onClick={() => setCorrectAnswer(option)}
                                    className={`flex border border-ascend-gray1 cursor-pointer  relative ${
                                        isCorrect
                                            ? "bg-ascend-lightgreen"
                                            : "bg-ascend-white"
                                    } transition-all duration-300`}
                                >
                                    <div className="flex items-center px-3 py-2">
                                        <div
                                            className={`flex items-center justify-center bg-ascend-white rounded-full w-5 h-5 shrink-0 ${
                                                isCorrect
                                                    ? "border-ascend-green border-2"
                                                    : "border-ascend-gray2 border"
                                            } transition-all duration-300`}
                                        >
                                            <div
                                                className={`rounded-full shrink-0 ${
                                                    isCorrect
                                                        ? "bg-ascend-green w-3 h-3"
                                                        : "bg-ascend-white w-0 h-0 "
                                                } transition-all duration-300`}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center cursor-pointer w-full px-3 py-2">
                                        <p className="flex-1 min-w-0 break-words">
                                            {option}
                                        </p>
                                        <div className="flex gap-2">
                                            <div
                                                onClick={(e) => {
                                                    stopPropagation(e);
                                                    setOptionToEdit({
                                                        index: i,
                                                        option,
                                                    });
                                                }}
                                                className={` rounded-3xl ${
                                                    isCorrect
                                                        ? "hover:bg-ascend-green/15"
                                                        : "hover:bg-ascend-lightblue"
                                                } transition-all duration-300`}
                                            >
                                                <AiFillEdit className="shrink-0 text-size4 text-ascend-yellow" />
                                            </div>
                                            <div
                                                className={`group  rounded-3xl ${
                                                    isCorrect
                                                        ? "hover:bg-ascend-green/15"
                                                        : "hover:bg-ascend-lightblue"
                                                } transition-all duration-300`}
                                            >
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
                    <SecondaryButton
                        doSomething={toggleAddOption}
                        icon={<BiPlus />}
                        text={"Add option"}
                    />
                    {/* {!isAddOption ? (
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
                    )} */}
                </div>
            </div>
        </div>
    );
}
