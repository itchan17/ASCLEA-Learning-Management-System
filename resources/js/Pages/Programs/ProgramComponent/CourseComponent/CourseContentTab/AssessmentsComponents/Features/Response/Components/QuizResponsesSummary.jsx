import React from "react";
import { calcPercentage } from "../../../../../../../../../Utils/calcPercentage";
import { convertDurationMinutes } from "../../../../../../../../../Utils/convertDurationMinutes";

export default function QuizResponsesSummary({ summary, assessment }) {
    return (
        <div className="space-y-5">
            <h1 className="text-size5 break-words font-semibold">Summary</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 p-4 font-bold">
                    <div className="w-full min-w-0">
                        <h1 className="text-size7 break-words text-ascend-black">
                            {summary.average_score}
                        </h1>
                        <span className="text-size4 text-ascend-gray2">
                            {calcPercentage(
                                summary.average_score,
                                assessment.quiz.quiz_total_points
                            )}
                            %
                        </span>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-ascend-black">Average Score</span>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 p-4 font-bold">
                    <div className="w-full min-w-0">
                        <h1 className="text-size7 break-words text-ascend-black">
                            {
                                convertDurationMinutes(summary.average_time)
                                    .formattedTime
                            }
                        </h1>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-ascend-black">Average TIme</span>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 p-4 font-bold">
                    <div className="w-full min-w-0">
                        <h1 className="text-size7 break-words text-ascend-black">
                            {`${summary.highest_score}/${assessment.quiz.quiz_total_points}`}
                        </h1>
                    </div>

                    <span className="text-size4 text-ascend-gray2">
                        {calcPercentage(
                            summary.highest_score,
                            assessment.quiz.quiz_total_points
                        )}
                        %
                    </span>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-ascend-black">Highest Score</span>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 p-4 font-bold">
                    <div className="w-full min-w-0">
                        <h1 className="text-size7 break-words text-ascend-black">
                            {`${summary.highest_score}/${assessment.quiz.quiz_total_points}`}
                        </h1>
                    </div>

                    <span className="text-size4 text-ascend-gray2">
                        {calcPercentage(
                            summary.lowest_score,
                            assessment.quiz.quiz_total_points
                        )}
                        %
                    </span>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-ascend-black">Lowest Score</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
