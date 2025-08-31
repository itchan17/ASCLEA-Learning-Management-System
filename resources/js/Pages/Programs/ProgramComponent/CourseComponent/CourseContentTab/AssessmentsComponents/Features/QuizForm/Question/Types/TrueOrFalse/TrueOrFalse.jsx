import React, { useState, useEffect } from "react";
import useCreateQuizStore from "../../../../../../../../../../../Stores/Programs/CourseContent/createQuizStore";

export default function TrueOrFalse() {
    // Create quiz store
    const handleQuestionDetailsChange = useCreateQuizStore(
        (state) => state.handleQuestionDetailsChange
    );
    const questionDetails = useCreateQuizStore(
        (state) => state.questionDetails
    );

    const choices = ["True", "False"];
    // immediately set the choices after selecting the question type
    useEffect(() => {
        handleQuestionDetailsChange("questionChoices", choices);
    }, []);

    const setCorrectAnswer = (option) => {
        console.log(option);
        console.log(questionDetails.questionAnswer.includes(option));
        // check first if the selected option is already set as correct if not unset the option as inncorrect
        let newQuestionAnswer = [option];
        handleQuestionDetailsChange("questionAnswer", newQuestionAnswer);
    };
    return (
        <div className="space-y-5">
            <div>
                <label className="font-bold">
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
                <label className="font-bold">
                    Options
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
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
