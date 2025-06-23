import React, { useState, useEffect } from "react";
import { AiFillDelete, AiOutlineArrowDown } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import SecondaryButton from "../../../../../../Components/Button/SecondaryButton";
import { BiPlus } from "react-icons/bi";
import PrimaryButton from "../../../../../../Components/Button/PrimaryButton";
import useCreateQuizStore from "../../../../../../Stores/Programs/CourseContent/createQuizStore";

export default function MultipleChoiceForm() {
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

    const [isAddOption, setIsAddOption] = useState(false);
    const toggleAddOption = () => {
        console.log("Clicked");
        setIsAddOption(!isAddOption);
    };
    const [option, setOption] = useState("");

    const handleAddOption = () => {
        console.log(option);
        handleQuestionDetailsChange("questionChoices", option);
        toggleAddOption();
    };
    useEffect(() => {
        console.log(questionDetails);
    }, [questionDetails]);
    return (
        <div className="border border-ascend-gray1 p-5 gap-5 space-y-5 shadow-shadow1">
            <div className="flex justify-between items-center gap-2 text-ascend-black">
                <h1 className="text-ascend-black font-bold">Multiple Choice</h1>
                <div className="flex justify-end items-center gap-2 text-ascend-black">
                    <div className="space-x-2">
                        <input
                            type="number"
                            className="border p-1 h-8 border-ascend-gray1 w-16"
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
                    <AiFillDelete
                        title="Delete question"
                        className="cursor-pointer"
                    />
                    <AiOutlineArrowDown
                        title="Move question up"
                        className="cursor-pointer"
                    />
                    <AiOutlineArrowDown
                        title="Move question down"
                        className="rotate-180 text-ascend-gray2 cursor-pointer"
                    />
                </div>
            </div>

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
                            handleQuestionDetailsChange(
                                "question",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div>
                    <label>
                        Options<span className="text-ascend-red">*</span>
                    </label>
                    <div className="space-y-5">
                        {questionDetails.questionChoices.length > 0 &&
                            questionDetails.questionChoices.map((option, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center border border-ascend-gray1 cursor-pointer h-12 px-2 relative"
                                    >
                                        <label className="flex items-center cursor-pointer w-full">
                                            <input
                                                type="radio"
                                                name="multipleChoiceOption"
                                                value={option}
                                                className="w-4 h-4 accent-ascend-blue cursor-pointer"
                                            />
                                            <span className="ml-2">
                                                {option}
                                            </span>
                                        </label>

                                        {/* Dropdown placed outside of label */}
                                        <div
                                            className="dropdown dropdown-end ml-auto"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div
                                                tabIndex={0}
                                                role="button"
                                                className="rounded-4xl p-1 hover:bg-ascend-lightblue transition-all duration-300"
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
                                                        Remove option
                                                    </a>
                                                </li>
                                            </ul>
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
            <div className="flex justify-between items-center">
                <div className="flex gap-1">
                    <input
                        type="checkbox"
                        defaultChecked
                        className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                    />
                    <span className="text-ascend-black font-bold">
                        Required
                    </span>
                </div>
                <PrimaryButton doSomething={handleAddQuestion} text={"Save"} />
            </div>
        </div>
    );
}
