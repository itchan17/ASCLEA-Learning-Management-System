import { useState } from "react";
import EmptyState from "../../../../../../../../../Components/EmptyState/EmptyState";
import { Pie } from "react-chartjs-2";

export default function QuizResponsesFMQ({
    frequentlyMissedQuestions,
    frequentlyMissedQuestionsWithColors,
}) {
    const [isSeeMore, setIsSeeMore] = useState(false);
    const [numOfQuestionToDisplay, setnumOfQuestionToDisplay] = useState(5);

    const handleClickSeeMore = () => {
        if (!isSeeMore) {
            setnumOfQuestionToDisplay(frequentlyMissedQuestions.length);
        } else {
            setnumOfQuestionToDisplay(5);
        }
        setIsSeeMore(!isSeeMore);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h1 className="text-size5 break-words font-semibold">
                    Frequently Missed Questions
                </h1>
                {frequentlyMissedQuestions.length > 0 && (
                    <span
                        onClick={handleClickSeeMore}
                        className="cursor-pointer hover:text-ascend-blue transition-all duration-300 text-nowrap hover:underline"
                    >
                        {!isSeeMore ? "See more" : "See less"}
                    </span>
                )}
            </div>

            {frequentlyMissedQuestions.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="flex justify-center col-span-1 lg:p-10">
                        <Pie
                            data={{
                                labels: frequentlyMissedQuestionsWithColors?.map(
                                    (question) =>
                                        `Question no. ${question.question_number}`
                                ),
                                datasets: [
                                    {
                                        data: frequentlyMissedQuestionsWithColors?.map(
                                            (question) => question.missed_rate
                                        ),
                                        backgroundColor:
                                            frequentlyMissedQuestionsWithColors?.map(
                                                (question) => question.color
                                            ),
                                        extra: frequentlyMissedQuestionsWithColors?.map(
                                            (q) => q.missed_count
                                        ),
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function (context) {
                                                const dataset = context.dataset;
                                                let missedRate = context.raw;
                                                const missedCount =
                                                    dataset.extra[
                                                        context.dataIndex
                                                    ];

                                                return [
                                                    `Missed Rate: ${missedRate}%`,
                                                    `Missed Count: ${missedCount}`,
                                                ];
                                            },
                                        },
                                    },
                                },
                            }}
                        ></Pie>
                    </div>

                    <ol className="md:col-span-1 lg:col-span-2 space-y-5 flex flex-col items-start max-h-[600px] overflow-y-auto ">
                        {frequentlyMissedQuestionsWithColors &&
                            frequentlyMissedQuestionsWithColors
                                ?.slice(0, numOfQuestionToDisplay)
                                .map((missedQuestion) => (
                                    <li
                                        key={missedQuestion.question_id}
                                        className="space-y-2"
                                    >
                                        <div className="flex flex-col items-start space-x-4 w-full">
                                            <div className="flex items-center space-x-4 w-full mb-2">
                                                <div
                                                    className={` w-5 h-5 shrink-0`}
                                                    style={{
                                                        backgroundColor:
                                                            missedQuestion.color,
                                                    }}
                                                ></div>
                                                <p className="text-gray-700 text-nowrap font-bold">
                                                    Question no.{" "}
                                                    {
                                                        missedQuestion.question_number
                                                    }
                                                    :
                                                </p>
                                            </div>

                                            <p className="text-gray-700">
                                                {missedQuestion.question}
                                            </p>
                                        </div>
                                        <div className="flex w-fit space-x-4">
                                            <div className="flex items-start space-x-1 w-full">
                                                <p className="text-gray-700 text-nowrap font-bold">
                                                    Missed Rate:
                                                </p>

                                                <p className="text-gray-700">
                                                    {missedQuestion.missed_rate}
                                                    %
                                                </p>
                                            </div>
                                            <div className="flex items-start space-x-1 w-full">
                                                <p className="text-gray-700 text-nowrap font-bold">
                                                    Missed Count:
                                                </p>

                                                <p className="text-gray-700">
                                                    {
                                                        missedQuestion.missed_count
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                    </ol>
                </div>
            ) : (
                <EmptyState
                    imgSrc={"/images/illustrations/empty.svg"}
                    text={`“No responses have been submitted for this quiz yet.”`}
                />
            )}
        </div>
    );
}
