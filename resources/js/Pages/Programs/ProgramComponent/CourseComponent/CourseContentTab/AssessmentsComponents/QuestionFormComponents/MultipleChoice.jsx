import React, { useState } from "react";
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

    // Local State
    const [isCorrectAnswer, setIsCorrectASnwer] = useState(false);

    // Fucntions
    const toggleAddOption = () => {
        console.log("Clicked");
        setIsAddOption(!isAddOption);
        setOption("");
    };

    const handleAddOption = () => {
        console.log(option);
        handleQuestionDetailsChange("questionChoices", option);
        setOption("");
        toggleAddOption();
    };

    const setCorrectAnswer = (option) => {
        console.log(option);
        console.log(questionDetails.questionAnswer.includes(option));
        if (questionDetails.questionAnswer.includes(option)) {
            let newQuestionAnswer = questionDetails.questionAnswer.filter(
                (ans) => ans !== option
            );
            handleQuestionDetailsChange("questionAnswer", newQuestionAnswer);
        } else {
            handleQuestionDetailsChange("questionAnswer", option);
        }
    };

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
                {/* List Options */}
                <label>
                    Options{" "}
                    <span className="text-size1">
                        (Click option/s to set correct asnwer)
                    </span>
                    <span className="text-ascend-red ml-1">*</span>
                </label>
                <div className="space-y-5">
                    {questionDetails.questionChoices.length > 0 &&
                        questionDetails.questionChoices.map((option, i) => {
                            let isCorrect = false;
                            isCorrect =
                                questionDetails.questionAnswer.includes(option);
                            return (
                                <div
                                    key={i}
                                    onClick={() => setCorrectAnswer(option)}
                                    className={`flex items-center border border-ascend-gray1 cursor-pointer min-h-12 p-2 relative ${
                                        isCorrect
                                            ? "bg-ascend-lightgreen"
                                            : "bg-ascend-white"
                                    } transition-all duration-300`}
                                >
                                    <div className="flex items-center cursor-pointer w-full">
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

                                        <p className="ml-3 flex-1 min-w-0 break-words">
                                            {option}
                                        </p>
                                        <div className="flex ml-5 gap-5">
                                            <AiFillEdit className="shrink-0 text-size3" />
                                            <AiFillDelete className="shrink-0 text-size3" />
                                        </div>
                                    </div>

                                    {/* Dropdown placed outside of label */}
                                    {/* <div
                                        className="dropdown dropdown-end ml-auto"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div
                                            tabIndex={0}
                                            role="button"
                                            className="rounded-4xl p-1 hover:bg-ascend-green/10 transition-all duration-300"
                                        >
                                            <BsThreeDotsVertical className="text-ascend-black" />
                                        </div>

                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu bg-ascend-white w-42 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black z-50"
                                        >
                                            <li
                                                onClick={() =>
                                                    handleQuestionDetailsChange(
                                                        "questionAnswer",
                                                        option
                                                    )
                                                }
                                            >
                                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                                    Mark as correct
                                                </a>
                                            </li>
                                            <li>
                                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                                    Edit option
                                                </a>
                                            </li>
                                            <li>
                                                <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                                    Remove option
                                                </a>
                                            </li>
                                        </ul>
                                    </div> */}
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
                                <PrimaryButton
                                    doSomething={handleAddOption}
                                    text={"Add"}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
