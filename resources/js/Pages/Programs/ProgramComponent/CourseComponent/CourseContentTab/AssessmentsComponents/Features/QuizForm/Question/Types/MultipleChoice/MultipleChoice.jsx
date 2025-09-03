import { useState, useEffect, useCallback } from "react";
import SecondaryButton from "../../../../../../../../../../../Components/Button/SecondaryButton";
import { BiPlus } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { usePage } from "@inertiajs/react";
import useQuestionStore from "../../Stores/questionStore";
import useOption from "../../Hooks/useOption";

export default function MultipleChoice({}) {
    const { assessmentId, quiz } = usePage().props;

    // Question store
    const questionOptions = useQuestionStore((state) => state.questionOptions);
    const questionDetails = useQuestionStore((state) => state.questionDetails);

    // Custom hooks
    const {
        handleAddOption,
        optionToEdit,
        setOptionToEdit,
        handleOptionChange,
        handleDeleteOption,
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
                {/* List Options */}
                {questionOptions.length > 0 && (
                    <label className="font-bold">
                        Options{" "}
                        <span className="text-size1">
                            (Click option/s to set correct asnwer)
                        </span>
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
                                    <div
                                        onClick={() =>
                                            handleOptionChange(
                                                {
                                                    ...optionToEdit,
                                                    is_correct:
                                                        !optionToEdit.is_correct,
                                                },
                                                i,
                                                questionDetails.question_type
                                            )
                                        }
                                        className={`absolute border-l-2 border-y-2 rounded-bl-[3px] rounded-tl-[3px] border-ascend-blue top-1/2 -translate-y-1/2 flex items-center px-4 h-full cursor-pointer ${
                                            option.is_correct
                                                ? "bg-ascend-lightgreen"
                                                : "bg-ascend-white"
                                        }`}
                                    >
                                        <div
                                            className={`flex items-center justify-center bg-ascend-white rounded-full w-5 h-5 shrink-0 ${
                                                option.is_correct
                                                    ? "border-ascend-green border-2"
                                                    : "border-ascend-gray2 border"
                                            } transition-all duration-300`}
                                        >
                                            <div
                                                className={`rounded-full shrink-0 ${
                                                    option.is_correct
                                                        ? "bg-ascend-green w-3 h-3"
                                                        : "bg-ascend-white w-0 h-0 "
                                                } transition-all duration-300`}
                                            />
                                        </div>
                                    </div>
                                    <input
                                        autoFocus
                                        key={i}
                                        type="text"
                                        value={option.option_text}
                                        className="w-full border border-ascend-gray1 focus:outline-ascend-blue pl-15 pr-3 py-2"
                                        placeholder="Type option"
                                        onChange={(e) =>
                                            handleOptionChange(
                                                {
                                                    ...optionToEdit,
                                                    option_text: e.target.value,
                                                },
                                                i,
                                                questionDetails.question_type
                                            )
                                        }
                                        onBlur={(e) => {
                                            setOptionToEdit(null);
                                            if (e.target.value.trim() === "") {
                                                handleOptionChange(
                                                    {
                                                        ...optionToEdit,
                                                        option_text: `Option ${
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
                                                is_correct: !option.is_correct,
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
                                    <div className="flex items-center pl-4 pr-3 py-2">
                                        <div
                                            className={`flex items-center justify-center bg-ascend-white rounded-full w-5 h-5 shrink-0 ${
                                                option.is_correct
                                                    ? "border-ascend-green border-2"
                                                    : "border-ascend-gray2 border"
                                            } transition-all duration-300`}
                                        >
                                            <div
                                                className={`rounded-full shrink-0 ${
                                                    option.is_correct
                                                        ? "bg-ascend-green w-3 h-3"
                                                        : "bg-ascend-white w-0 h-0 "
                                                } transition-all duration-300`}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center cursor-pointer w-full px-3 py-2">
                                        <p className="flex-1 min-w-0 break-words">
                                            {option.option_text}
                                        </p>
                                        <div className="flex gap-2">
                                            <div
                                                onClick={(e) => {
                                                    console.log(option);
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
                        doSomething={() => handleAddOption("multiple_choice")}
                        icon={<BiPlus />}
                        text={"Add option"}
                    />
                </div>
            </div>
        </div>
    );
}
