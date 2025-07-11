import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import CustomSelect from "../../../Components/CustomInputField/CustomSelect";

export default function StaffCharts() {
    return (
        <div className="flex flex-col md:flex-row justify-between">
            <div className="space-y-5 w-full md:w-2/3">
                <div className="sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                    <div>
                        <h1 className="text-size4 font-bold">
                            Avg Time Spent (Hours)
                        </h1>
                    </div>
                    <Line
                        data={{
                            labels: [
                                "May 5",
                                "May 6",
                                "May 7",
                                "May 8",
                                "May 9",
                                "May 10",
                                "May 11",
                            ],
                            datasets: [
                                {
                                    label: "",
                                    data: [5, 6, 1, 3, 5, 8, 3],
                                    borderColor: "#01007d",
                                    backgroundColor: "#e4e4ff",
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
                                    ticks: {
                                        callback: (value) => value + "hrs",
                                    },
                                },
                            },
                        }}
                        plugins={[ChartDataLabels]}
                    ></Line>
                </div>
                <div className="sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                    <div>
                        <h1 className="text-size4 font-bold">Daily Logins</h1>
                    </div>
                    <Bar
                        data={{
                            labels: [
                                "May 5",
                                "May 6",
                                "May 7",
                                "May 8",
                                "May 9",
                                "May 10",
                                "May 11",
                            ],
                            datasets: [
                                {
                                    label: "",
                                    data: [5, 6, 1, 3, 5, 8, 3],
                                    backgroundColor: "#01007d",
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        }}
                    ></Bar>
                </div>
            </div>
            <div className="w-full md:w-1/3 md:pl-5 pt-5 md:pt-0">
                <div className="h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                    <div>
                        <h1 className="text-size4 font-bold">
                            Assessment Submission Status
                        </h1>
                    </div>
                    <CustomSelect
                        selectField={
                            <select
                                className="w-full rounded-none appearance-none border px-2 s text-size1 py-2 focus:outline-ascend-blue"
                                name="Select Course"
                                id=""
                            >
                                <option className="" value="">
                                    Select assessment
                                </option>
                                <option value="let">Quiz 1</option>
                                <option value="ctp">Mock exam</option>
                            </select>
                        }
                    />
                    <Pie
                        data={{
                            labels: [
                                "Submitted on time",
                                "Late submission",
                                "Not submitted",
                            ],
                            datasets: [
                                {
                                    label: "",
                                    data: [72, 41, 15],
                                    backgroundColor: [
                                        "#f9a502",
                                        "#01007d",
                                        "#c51919",
                                    ],
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        }}
                    ></Pie>
                    <div className="space-y-2">
                        <div className="">
                            <div className="flex items-center space-x-2">
                                <div
                                    className={`h-4 w-4 ${"bg-ascend-blue"}`}
                                ></div>
                                <span className="text-size1 text-ascend-gray3">
                                    Submitted on time
                                </span>
                            </div>

                            <span className="font-bold ml-6">72</span>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <div
                                    className={`h-4 w-4 ${"bg-ascend-yellow"}`}
                                ></div>
                                <span className="text-size1 text-ascend-gray3">
                                    Late submission
                                </span>
                            </div>

                            <span className="font-bold ml-6">41</span>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <div
                                    className={`h-4 w-4 ${"bg-ascend-red"}`}
                                ></div>
                                <span className="text-size1 text-ascend-gray3">
                                    Not submitted
                                </span>
                            </div>

                            <span className="font-bold ml-6">15</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
