import React, { useState, useEffect } from "react";
import useCreateQuizStore from "../../../../../../../../../../../Stores/Programs/CourseContent/createQuizStore";
import SecondaryButton from "../../../../../../../../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../../../../../../../../Components/Button/PrimaryButton";
import { BiPlus } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import useOption from "../../Hooks/useOption";
import useQuestionStore from "../../Stores/questionStore";
import { usePage } from "@inertiajs/react";

export default function Identification() {
    const { assessmentId, quiz } = usePage().props;

    // Question store
    const questionOptions = useQuestionStore((state) => state.questionOptions);
    const questionDetails = useQuestionStore((state) => state.questionDetails);

    // Custom hook
    const {
        handleOptionChange,
        handleAddOption,
        handleDeleteOption,
        optionToEdit,
        setOptionToEdit,
    } = useOption({
        assessmentId,
        quizId: quiz.quiz_id,
        questionId: questionDetails.question_id,
    });

    // Functions
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="space-y-5">
            <div>
                <div>
                    {/* List Options */}
                    {questionOptions && questionOptions.length > 0 && (
                        <label className="font-bold">
                            {questionOptions.length > 1 ? (
                                <span className="text-ascend-green">
                                    Correct answers:
                                </span>
                            ) : (
                                <span className="text-ascend-green">
                                    Correct answer:
                                </span>
                            )}
                        </label>
                    )}

                    <div className="space-y-5">
                        {questionOptions &&
                            questionOptions.length > 0 &&
                            questionOptions.map((option, i) => {
                                console.log(optionToEdit);
                                return optionToEdit &&
                                    optionToEdit.question_option_id &&
                                    optionToEdit.question_option_id ==
                                        option.question_option_id ? (
                                    // Input field for edit option
                                    <div
                                        key={option.question_option_id || i}
                                        className="relative"
                                    >
                                        <input
                                            autoFocus
                                            key={i}
                                            type="text"
                                            value={option.option_text}
                                            className="w-full border border-ascend-gray1 focus:outline-ascend-blue px-3 py-2"
                                            placeholder="Type option"
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    {
                                                        ...optionToEdit,
                                                        option_text:
                                                            e.target.value,
                                                    },
                                                    i
                                                )
                                            }
                                            onBlur={(e) => {
                                                setOptionToEdit(null);
                                                if (
                                                    e.target.value.trim() === ""
                                                ) {
                                                    handleOptionChange(
                                                        {
                                                            ...optionToEdit,
                                                            option_text: `Correct Answer ${
                                                                i + 1
                                                            }`,
                                                        },
                                                        i,
                                                        questionDetails.question_type
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                ) : (
                                    // Option
                                    <div
                                        key={option.question_option_id || i}
                                        onClick={() =>
                                            handleOptionChange(
                                                {
                                                    ...option,
                                                    is_correct:
                                                        !option.is_correct,
                                                },
                                                i,
                                                questionDetails.question_type
                                            )
                                        }
                                        className={`flex border border-ascend-gray1 cursor-pointer  relative ${
                                            option.is_correct
                                                ? "bg-ascend-lightgreen"
                                                : "bg-ascend-white"
                                        } transition-all duration-300`}
                                    >
                                        <div className="flex items-center cursor-pointer w-full px-3 py-2">
                                            <p className="flex-1 min-w-0 break-words">
                                                {option.option_text}
                                            </p>
                                            <div className="flex gap-2">
                                                <div
                                                    onClick={(e) => {
                                                        stopPropagation(e);
                                                        setOptionToEdit(option);
                                                    }}
                                                    className={` rounded-3xl ${
                                                        option.is_correct
                                                            ? "hover:bg-ascend-green/15"
                                                            : "hover:bg-ascend-lightblue"
                                                    } transition-all duration-300`}
                                                >
                                                    <AiFillEdit className="shrink-0 text-size4 text-ascend-yellow" />
                                                </div>
                                                <div
                                                    className={`group  rounded-3xl ${
                                                        option.is_correct
                                                            ? "hover:bg-ascend-green/15"
                                                            : "hover:bg-ascend-lightblue"
                                                    } transition-all duration-300`}
                                                >
                                                    <AiFillDelete
                                                        onClick={(e) => {
                                                            stopPropagation(e);
                                                            handleDeleteOption(
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
                            doSomething={() => handleAddOption("idetification")}
                            icon={<BiPlus />}
                            text={"Add answer"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
