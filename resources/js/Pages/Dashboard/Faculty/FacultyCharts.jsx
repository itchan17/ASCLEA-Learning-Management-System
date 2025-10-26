import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import CustomSelect from "../../../Components/CustomInputField/CustomSelect";

export default function StaffCharts({ dailyLogins, avgTimePerDay, assessments }) {
    const [selectedAssessment, setSelectedAssessment] = useState("");

    // Find selected assessment data
    const currentAssessment = assessments.find(
        (a) => a.assessment_id === selectedAssessment
    );

    // Default to 0 if not selected
    const submitted = currentAssessment?.submitted_count || 0;
    const returned = currentAssessment?.returned_count || 0;
    const notSubmitted = currentAssessment?.not_submitted_count || 0;

    return (
        <div className="flex flex-col md:flex-row justify-between">
            {/* Left side charts */}
            <div className="space-y-5 w-full md:w-2/3">
                {/* Avg Time Spent Chart */}
                <div className="sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                    <h1 className="text-size4 font-bold">Avg Time Spent (Hours)</h1>
                    <Line
                        data={{
                            labels: Object.keys(avgTimePerDay).map((d) =>
                                new Date(d).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            ),
                            datasets: [
                                {
                                    label: "Avg Time Spent",
                                    data: Object.values(avgTimePerDay),
                                    borderColor: "#01007d",
                                    backgroundColor: "#e4e4ff",
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                legend: { display: false },
                                datalabels: { color: "#01007d" },
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
                    />
                </div>

                {/* Daily Logins */}
                <div className="sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                    <h1 className="text-size4 font-bold">Daily Logins</h1>
                    <Bar
                        data={{
                            labels: dailyLogins.dates.map((d) =>
                                new Date(d).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            ),
                            datasets: [
                                {
                                    label: "Student Logins",
                                    data: dailyLogins.counts,
                                    backgroundColor: "#01007d",
                                },
                            ],
                        }}
                        options={{
                            plugins: { legend: { display: false } },
                            scales: {
                                y: { beginAtZero: true, ticks: { precision: 0 } },
                            },
                        }}
                    />
                </div>
            </div>

            {/* Right side chart */}
            <div className="w-full md:w-1/3 md:pl-5 pt-5 md:pt-0">
                <div className="h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                    <h1 className="text-size4 font-bold">Assessment Submission Status</h1>

                    {/* Dropdown */}
                    <CustomSelect
                        selectField={
                            <select
                                className="w-full rounded-none appearance-none border px-2 py-2 focus:outline-ascend-blue"
                                onChange={(e) => setSelectedAssessment(e.target.value)}
                                value={selectedAssessment}
                            >
                                <option value="">Select assessment</option>
                                {assessments.map((a) => (
                                    <option
                                        key={a.assessment_id}
                                        value={a.assessment_id}
                                    >
                                        {a.assessment_title}
                                    </option>
                                ))}
                            </select>
                        }
                    />

                    {/* Conditional rendering */}
                    {selectedAssessment ? (
                        <>
                            <Pie
                                data={{
                                    labels: ["Submitted", "Returned", "Not submitted"],
                                    datasets: [
                                        {
                                            label: "",
                                            data: [submitted, returned, notSubmitted],
                                            backgroundColor: [
                                                "#f9a502",
                                                "#01007d",
                                                "#c51919",
                                            ],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: { legend: { display: false } },
                                }}
                            />

                            {/* Manual Legend */}
                            <div className="space-y-2">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-4 w-4 bg-ascend-yellow"></div>
                                        <span className="text-size1 text-ascend-gray3">Submitted</span>
                                    </div>
                                    <span className="font-bold ml-6">{submitted}</span>
                                </div>

                                <div>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-4 w-4 bg-ascend-blue"></div>
                                        <span className="text-size1 text-ascend-gray3">Returned</span>
                                    </div>
                                    <span className="font-bold ml-6">{returned}</span>
                                </div>

                                <div>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-4 w-4 bg-ascend-red"></div>
                                        <span className="text-size1 text-ascend-gray3">Not submitted</span>
                                    </div>
                                    <span className="font-bold ml-6">{notSubmitted}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-48 text-ascend-gray3 text-center">
                            <p className="h-48 text-ascend-gray4 italic">
                                Please select a course to check the Assessment Submission Status.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
