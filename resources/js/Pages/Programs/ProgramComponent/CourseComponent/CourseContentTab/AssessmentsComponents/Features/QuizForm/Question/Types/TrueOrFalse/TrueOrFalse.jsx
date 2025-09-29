import React, { useState, useEffect } from "react";
import useQuestionStore from "../../Stores/questionStore";
import useOption from "../../Hooks/useOption";
import { usePage } from "@inertiajs/react";

export default function TrueOrFalse() {
    const { assessmentId, quiz } = usePage().props;

    // Question store
    const questionOptions = useQuestionStore((state) => state.questionOptions);
    const questionDetails = useQuestionStore((state) => state.questionDetails);

    // Custom hook
    const { handleOptionChange } = useOption({
        assessmentId,
        quizId: quiz.quiz_id,
        questionId: questionDetails.question_id,
    });

    return (
        <div className="space-y-5">
            <div>
                <label className="font-bold">
                    Options{" "}
                    <span className="text-size1">
                        (Click option/s to set correct asnwer)
                    </span>
                    <span className="text-ascend-red ml-1">*</span>
                </label>
                <div className="space-y-5">
                    {questionOptions &&
                        questionOptions.length > 0 &&
                        questionOptions.map((option, i) => {
                            return (
                                <div
                                    key={
                                        option.question_option_id ||
                                        option.option_temp_id
                                    }
                                    onClick={() =>
                                        handleOptionChange(
                                            {
                                                ...option,
                                                is_correct: !option.is_correct,
                                            },
                                            i
                                        )
                                    }
                                    className={`flex items-center border border-ascend-gray1 cursor-pointer min-h-12 p-2 relative ${
                                        option.is_correct
                                            ? "bg-ascend-lightgreen"
                                            : "bg-ascend-white"
                                    } transition-all duration-300`}
                                >
                                    <div className="flex items-center cursor-pointer w-full">
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

                                        <p className="ml-3 flex-1 min-w-0 break-words">
                                            {option.option_text}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
