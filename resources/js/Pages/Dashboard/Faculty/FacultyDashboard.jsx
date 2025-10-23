import React from "react";
import FacultyCharts from "./FacultyCharts";
import FacultyDashboardCard from "./FacultyDashboardCard";

export default function StaffDashboard({stats, dailyLogins, avgTimePerDay, assessments}) {
    return (
        <>
            <FacultyDashboardCard stats={stats}/>
            <FacultyCharts dailyLogins={dailyLogins} avgTimePerDay={avgTimePerDay} assessments={assessments}/>
        </>
    );
}
