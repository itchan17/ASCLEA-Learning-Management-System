import React from "react";
import { calcPercentage } from "../../../../../../../../../Utils/calcPercentage";
import { getElapsedTime } from "../../../../../../../../../Utils/getElapsedTime";
import { Doughnut } from "react-chartjs-2";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

export default function ResultFeedback({ quiz, assessmentSubmission }) {
    const percentage = calcPercentage(
        assessmentSubmission.score,
        quiz.quiz_total_points
    );

    const { hours, minutes, seconds } = getElapsedTime(
        assessmentSubmission.created_at,
        assessmentSubmission.submitted_at
    );

    return (
        <div className="w-full space-y-5 border border-ascend-gray1 shadow-shadow1 p-5">
            <h1 className="font-bold text-size6">Result</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
                <div className="col-span-1 flex flex-col items-center space-y-5">
                    <div className="relative w-40 h-40">
                        <Doughnut
                            data={{
                                labels: [],
                                datasets: [
                                    {
                                        data: [percentage, 100 - percentage],
                                        backgroundColor: ["#01007d", "#E0E0E0"],
                                        borderWidth: 0,
                                    },
                                ],
                            }}
                            options={{
                                cutout: "75%",
                                plugins: {
                                    legend: { display: false },
                                    tooltip: { enabled: false },
                                },
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex justify-center w-30 items-center flex-col">
                                <h1 className="text-size6 font-bold text-ascend-black">
                                    {percentage}%
                                </h1>
                                <p className="text-size1 text-ascend-black text-center">
                                    {assessmentSubmission.score} out of{" "}
                                    {quiz.quiz_total_points}
                                </p>
                            </div>
                        </div>
                    </div>
                    {quiz.duration > 0 && (
                        <div className="flex space-x-5 w-full">
                            <MdOutlineAccessTimeFilled className="text-ascend-blue text-5xl" />
                            <div>
                                <h1>Time Spent</h1>
                                <p className="font-bold">
                                    {hours > 0
                                        ? hours === 1
                                            ? `${hours} hour`
                                            : `${hours} hours`
                                        : ""}
                                    {minutes > 0
                                        ? minutes === 1
                                            ? ` ${
                                                  hours > 0 ? "and" : ""
                                              } ${minutes} minute`
                                            : ` ${
                                                  hours > 0 ? "and" : ""
                                              } ${minutes} minutes`
                                        : ""}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-span-2 flex flex-col space-y-5">
                    <h1 className="font-bold text-size5">
                        Feedback{" "}
                        <span className="text-size2 font-normal">
                            AI Generated
                        </span>
                    </h1>
                    <div className="space-y-5">
                        <div>
                            <h1 className="font-bold text-size4">Strengths</h1>
                            <ul className="list-disc list-outside ml-5">
                                <li>
                                    You demonstrated a solid understanding of
                                    the 4A’s of facilitating learning,
                                    specifically identifying the correct steps
                                    for both starting a lesson (Activity) and
                                    relating ideas to real life (Application).
                                </li>
                                <li>
                                    This shows that you are familiar with
                                    effective instructional strategies and how
                                    to structure lessons for meaningful
                                    learning.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h1 className="font-bold text-size4">Weaknesses</h1>
                            <ul className="list-disc list-outside ml-5">
                                <li>
                                    There’s some confusion in distinguishing
                                    between teaching approaches, such as
                                    reflective vs. inquiry-based.
                                </li>
                                <li>
                                    Understanding of assessment types also needs
                                    improvement, especially in terms of
                                    identifying subjective vs. objective formats
                                    and recognizing tools used to connect ideas
                                    (e.g., mapping).
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h1 className="font-bold text-size4">
                                Suggestions
                            </h1>
                            <p>
                                Focus on reviewing the different types of
                                assessment methods and teaching approaches. Make
                                a comparison chart or flashcards to
                                differentiate terms like reflective,
                                inquiry-based, constructivist, and assessment
                                tools like mapping, essay, matching. Practice by
                                analyzing sample scenarios and matching them to
                                the correct teaching or assessment strategy.
                                This will help reinforce key concepts and reduce
                                confusion during exams.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
