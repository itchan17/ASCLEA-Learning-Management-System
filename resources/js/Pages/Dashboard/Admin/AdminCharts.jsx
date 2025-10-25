import React, { useMemo } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

function StaffCharts({ studentsPerProgram, dailyLogins, avgTimePerDay }) {
    const programLabels = studentsPerProgram.map(p => p.program_name);
    const programData = studentsPerProgram.map(p => p.total_students);

    const backgroundColors = ["#f9a502","#01007d","#ff6384","#36a2eb","#4caf50","#ff9800",];
    
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
                            labels: Object.keys(avgTimePerDay).map(d =>
                            new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            ),
                            datasets: [{
                            label: "Avg Time Spent",
                            data: Object.values(avgTimePerDay),
                            borderColor: "#01007d",
                            backgroundColor: "#e4e4ff",
                            }],
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
                            labels: dailyLogins.dates.map(d =>
                                new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
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
                                y: {
                                    beginAtZero: true,
                                    ticks: { precision: 0 },
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <div className="w-full md:w-1/3 md:pl-5 pt-5 md:pt-0">
                <div className="h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                    <div>
                        <h1 className="text-size4 font-bold">
                            Students per Program
                        </h1>
                    </div>
                    <Pie
                        data={{
                            labels: programLabels,
                            datasets: [{
                                label: "Students per Program",
                                data: programData,
                                backgroundColor: backgroundColors.slice(0, programLabels.length),
                            }],
                        }}
                        options={{ plugins: { legend: { display: false } } }}
                    />

                    {/* Legend below Pie chart */}
                    <div className="space-y-2">
                        {studentsPerProgram.map((program, index) => (
                            <div key={program.program_id}>
                                <div className="flex items-center space-x-2">
                                    <div
                                        className={`h-4 w-4`}
                                        style={{ backgroundColor: backgroundColors[index] }}
                                    ></div>
                                    <span className="text-size1 text-ascend-gray3">
                                        {program.program_name}
                                    </span>
                                </div>
                                <span className="font-bold ml-6">{program.total_students}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(StaffCharts);
