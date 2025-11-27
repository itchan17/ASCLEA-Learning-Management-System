import React from "react";
import FacultyCharts from "./FacultyCharts";
import FacultyDashboardCard from "./FacultyDashboardCard";

export default function StaffDashboard({stats, dailyLogins, avgTimePerDay, assessments, totalTimeSpent}) {
    return (
        <>
            <FacultyDashboardCard stats={stats} totalTimeSpent={totalTimeSpent}/>
            <FacultyCharts dailyLogins={dailyLogins} avgTimePerDay={avgTimePerDay} assessments={assessments}/>
        </>
    );
}
