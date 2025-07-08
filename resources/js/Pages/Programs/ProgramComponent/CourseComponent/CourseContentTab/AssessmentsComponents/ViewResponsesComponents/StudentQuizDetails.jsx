import React from "react";
import { MdOutlineClose } from "react-icons/md";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { MdArrowUpward } from "react-icons/md";

export default function StudentQuizDetails({ setIsDetailsOpen }) {
    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center font-nunito-sans">
            <div className="bg-ascend-white opacity-100 p-5 w-150 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-size4 font-bold">
                        Studens Quiz Details
                    </h1>
                    <div
                        onClick={() => setIsDetailsOpen(false)}
                        className="hover:bg-ascend-lightblue transition-all duration-300 p-1 rounded-4xl cursor-pointer"
                    >
                        <MdOutlineClose className="text-size5" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-5">
                        <div className="w-20 h-20 bg-ascend-gray1 rounded-full shrink-0"></div>
                        <div>
                            <h1 className="text-size3 font-semibold">
                                John Doe
                            </h1>
                            <span>johndoe@email.com</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-size4 font-bold text-ascend-gray3">
                            Rank
                        </h1>
                        <span className="text-5xl font-semibold text-ascend-green">
                            3
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="col-span-1 space-y-5">
                        <div>
                            <h1 className="text-size4 font-bold text-ascend-gray3">
                                Score
                            </h1>
                            <div className="flex flex-wrap items-center gap-1">
                                <span className="text-size7 font-semibold">
                                    119/150
                                </span>
                                <span className="text-size4 font-bold text-ascend-gray3">
                                    (80%)
                                </span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-size4 font-bold text-ascend-gray3">
                                Time
                            </h1>
                            <div className="flex items-center gap-1">
                                <span className="text-size7 font-semibold">
                                    2hrs 12mins
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2 space-y-5">
                        <div className="h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                            <div className="flex justify-between items-center">
                                <h1 className="text-size4 font-bold">
                                    Improvement Rate
                                </h1>
                                <span className="text-size1 flex items-center">
                                    30%
                                    <MdArrowUpward className="text-ascend-green text-size3" />
                                </span>
                            </div>

                            <Bar
                                data={{
                                    labels: ["Previous Drill", "Current Drill"],
                                    datasets: [
                                        {
                                            label: "",
                                            data: [70, 95],
                                            backgroundColor: [
                                                "#C51919",
                                                "#00a600",
                                            ],
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
                                                callback: (value) =>
                                                    value + "%",
                                            },
                                        },
                                    },
                                }}
                                plugins={[ChartDataLabels]}
                            ></Bar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
