import React from "react";
import { AiFillEdit, AiFillDelete, AiOutlineArrowDown } from "react-icons/ai";

export default function Question({ questionDetails, questionNumber }) {
    return (
        <div className="space-y-5">
            <div className="flex justify-end gap-2 text-ascend-black">
                <AiFillEdit title="Edit question" className="cursor-pointer" />
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

            <div className="flex">
                <span>{questionNumber}.</span>
                <div className="w-full min-w-0 ml-2 space-y-5">
                    {/* Question */}
                    <div className="flex items-start gap-2 md:gap-20">
                        <p className="flex-1 min-w-0 break-words">
                            {questionDetails.question}
                            <span className="text-ascend-red">*</span>
                        </p>
                        <span className="font-bold">
                            {`${questionDetails.questionPoints} ${
                                questionDetails.questionPoints > 1
                                    ? "pts"
                                    : "pt"
                            }`}
                        </span>
                    </div>
                    {/* Multiple Choice */}
                    {questionDetails.questionType === "multiple_choice" ? (
                        <div className="flex flex-col space-y-4">
                            {questionDetails.questionChoices.length > 0 &&
                                questionDetails.questionChoices.map(
                                    (choice, i) => {
                                        return (
                                            <label
                                                key={i}
                                                className="flex items-center cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name="multipleChoiceOption"
                                                    value={choice}
                                                    className="w-4 h-4 accent-ascend-blue cursor-pointer"
                                                />
                                                <span className="ml-2">
                                                    {choice}
                                                </span>
                                            </label>
                                        );
                                    }
                                )}
                        </div>
                    ) : questionDetails.questionType === "true_or_false" ? (
                        <div className="flex flex-col space-y-4">
                            {questionDetails.questionChoices.length > 0 &&
                                questionDetails.questionChoices.map(
                                    (choice, i) => {
                                        return (
                                            <label
                                                key={i}
                                                className="flex items-center cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name="trueOrFalseOption"
                                                    value={choice}
                                                    className="w-4 h-4 accent-ascend-blue cursor-pointer"
                                                />
                                                <span className="ml-2">
                                                    {choice}
                                                </span>
                                            </label>
                                        );
                                    }
                                )}
                        </div>
                    ) : (
                        <input
                            type="text"
                            placeholder="Enter answer"
                            className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
