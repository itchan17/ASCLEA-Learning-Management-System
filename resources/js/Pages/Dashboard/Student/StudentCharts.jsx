import React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import { MdArrowUpward } from "react-icons/md";
import CustomSelect from "../../../Components/CustomInputField/CustomSelect";

export default function StudentCharts({ dailyTimeSpent = [] }) {
    const labels = dailyTimeSpent.map((d) =>
        new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );
    const hours = dailyTimeSpent.map((d) => d.hours);
    
    return (
        <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-[60%]">
                <div className="sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                    <div>
                        <h1 className="text-size4 font-bold">
                            Daily Time Spent
                        </h1>
                    </div>
                    <Line
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: "Hours Spent",
                                    data: hours,
                                    borderColor: "#01007d",
                                    backgroundColor: "#e4e4ff",
                                },
                            ],
                        }}
                        options={{
                            plugins: { legend: { display: false } },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: { callback: (v) => v + " hrs" },
                                },
                            },
                        }}
                        plugins={[ChartDataLabels]}
                    />
                </div>
            </div>
            <div className="w-full md:w-[40%] pt-5 md:pt-0 md:pl-5 ">
                <div className="h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                    <div className="flex justify-between items-center">
                        <h1 className="text-size4 font-bold">
                            Improvement Rate
                        </h1>
                        <span className="text-size1 flex items-center">
                            25%
                            <MdArrowUpward className="text-ascend-green text-size3" />
                        </span>
                    </div>
                    <CustomSelect
                        selectField={
                            <select
                                className="w-full rounded-none appearance-none border px-2 s text-size1 py-2 focus:outline-ascend-blue"
                                name="Select Course"
                                id=""
                            >
                                <option className="" value="">
                                    Select a course
                                </option>
                                <option value="let">
                                    Licensure Examination for Teachers
                                </option>
                                <option value="ctp">
                                    Certificate in Teaching Program
                                </option>
                            </select>
                        }
                    />

                    <Bar
                        data={{
                            labels: ["Previous Drill", "Current Drill"],
                            datasets: [
                                {
                                    label: "",
                                    data: [70, 95],
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
    );
}
