import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { MdArrowUpward } from "react-icons/md";
import ViewEvidence from "./ViewEvidence";
import { calcPercentage } from "../../../../../../../../../Utils/calcPercentage";
import { convertDurationMinutes } from "../../../../../../../../../Utils/convertDurationMinutes";

export default function StudentQuizDetails({
    assessmentSubmission,
    prevQuizAssessmentSubmitted,
    studentData,
    quiz,
}) {
    const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
    const [improvementRateDetails, setImprovementRateDetails] = useState({
        label: [],
        data: [],
        improvementPercent: 0,
    });

    const calculateImprovementRate = () => {
        let improvementRateDetails = {};

        if (!prevQuizAssessmentSubmitted) {
            improvementRateDetails.label = ["No previous data"];
            improvementRateDetails.data = [0];
        } else {
            improvementRateDetails.label = ["Previous"];
            improvementRateDetails.data = [
                calcPercentage(
                    prevQuizAssessmentSubmitted.score,
                    prevQuizAssessmentSubmitted.assessment.quiz
                        .quiz_total_points
                ),
            ];
        }

        improvementRateDetails.label.push("Current");
        improvementRateDetails.data.push(
            calcPercentage(assessmentSubmission.score, quiz.quiz_total_points)
        );
        improvementRateDetails.improvementPercent =
            improvementRateDetails.data[1] - improvementRateDetails.data[0];

        return improvementRateDetails;
    };

    useEffect(() => {
        setImprovementRateDetails(() => calculateImprovementRate());
    }, [assessmentSubmission]);

    return (
        <div className="bg-ascend-white p-5 space-y-5 border border-ascend-gray1 shadow-shadow1">
            <div className="flex items-center justify-between">
                <h1 className="text-size6 font-bold">Student Quiz Result</h1>
            </div>

            {/* <div className="flex flex-wrap gap-5 items-center justify-between">
               
            </div> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="col-span-full lg:col-span-1 space-y-5">
                    <div className="flex items-center space-x-5">
                        <div className="w-20 h-20 bg-ascend-gray1 rounded-full shrink-0"></div>
                        <div>
                            <h1 className="text-size3 font-semibold break-all">
                                {`${studentData.first_name} ${studentData.last_name}`}
                            </h1>
                            <span className="break-all">
                                {studentData.email}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap lg:flex-col space-x-5">
                        <div>
                            <h1 className="text-size4 font-bold text-ascend-gray3">
                                Score
                            </h1>
                            <div className="flex flex-wrap items-center gap-1">
                                <span className="text-size7 font-semibold">
                                    {`${assessmentSubmission.score}/${quiz.quiz_total_points}`}
                                </span>
                                <span className="text-size4 font-bold text-ascend-gray3">
                                    {`${calcPercentage(
                                        assessmentSubmission.score,
                                        quiz.quiz_total_points
                                    )}%`}
                                </span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-size4 font-bold text-ascend-gray3">
                                Time
                            </h1>
                            <div className="flex items-center gap-1">
                                <span className="text-size7 font-semibold">
                                    {
                                        convertDurationMinutes(
                                            assessmentSubmission.time_spent !==
                                                null
                                                ? assessmentSubmission.time_spent
                                                : 0
                                        ).formattedTime
                                    }
                                </span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-size4 font-bold text-ascend-gray3">
                                Warnings
                                <span
                                    onClick={() =>
                                        setIsEvidenceOpen(!isEvidenceOpen)
                                    }
                                    className="ml-2 text-ascend-black text-size1 cursor-pointer hover:text-ascend-blue transition-all duration-300 text-nowrap hover:underline"
                                >
                                    See details
                                </span>
                            </h1>
                            <div className="flex items-center gap-1">
                                <span className="text-size7 font-semibold">
                                    6
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-2 space-y-5">
                    <div className="h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                        <div className="flex justify-between items-center">
                            <h1 className="text-size4 font-bold">
                                Improvement Rate
                            </h1>

                            {improvementRateDetails.improvementPercent > 0 ? (
                                <span className="text-size1 flex items-center">
                                    {improvementRateDetails.improvementPercent}%
                                    <MdArrowUpward className="text-ascend-green text-size3" />
                                </span>
                            ) : improvementRateDetails.improvementPercent ===
                              0 ? (
                                <span className="text-size1 flex items-center">
                                    {improvementRateDetails.improvementPercent}%
                                </span>
                            ) : (
                                <span className="text-size1 flex items-center">
                                    {improvementRateDetails.improvementPercent}%
                                    <MdArrowUpward className="text-ascend-red text-size3 transform scale-y-[-1]" />
                                </span>
                            )}
                        </div>

                        <Bar
                            data={{
                                labels: improvementRateDetails.label,
                                datasets: [
                                    {
                                        label: "",
                                        data: improvementRateDetails.data,
                                        backgroundColor: ["#C51919", "#00a600"],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    datalabels: {
                                        color: "#01007d",
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        max: 100,
                                        ticks: {
                                            callback: (value) => value + "%",
                                        },
                                    },
                                },
                            }}
                            plugins={[ChartDataLabels]}
                        ></Bar>
                    </div>
                </div>
            </div>

            {isEvidenceOpen && (
                <ViewEvidence setIsEvidenceOpen={setIsEvidenceOpen} />
            )}
        </div>
    );
}
