import React from "react";

export default function QuestionItem({ questionId }) {
    return (
        <div className="p-5 shadow-shadow1 border border-ascend-gray1 space-y-5">
            <div className="flex">
                1.
                <div className="w-full min-w-0 ml-2 space-y-5">
                    <div className="flex items-start gap-2 md:gap-20">
                        <p className="flex-1 min-w-0 break-words">
                            his is the first question This is the first question
                            This is the first question This is the first
                            question This is the first question This is the
                            first question This is the first question This is
                            the first question
                            <span className="text-ascend-red ml-1">*</span>
                            {/* {questionDetails.question}
                    {questionDetails.is_required == true && (
                        <span className="text-ascend-red ml-1">*</span>
                    )} */}
                        </p>

                        <span className="font-bold text-nowrap">2 points</span>
                        {/* <span className="font-bold">
                    {`${questionDetails.question_points} ${
                        questionDetails.question_points > 1 ? "pts" : "pt"
                    }`}
                </span> */}
                    </div>

                    {/* Option list */}
                    <div className="flex flex-col space-y-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name={questionId}
                                value={"Option 1"}
                                className="w-5 h-5 accent-ascend-blue shrink-0"
                            />
                            <span className="ml-3 min-w-0 break-words">
                                {"Option 1"}
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name={questionId}
                                value={"Option 2"}
                                className="w-5 h-5 accent-ascend-blue shrink-0"
                            />
                            <span className="ml-3 min-w-0 break-words">
                                {"Option 2"}
                            </span>
                        </label>

                        <input
                            type="text"
                            placeholder="Enter answer"
                            className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
