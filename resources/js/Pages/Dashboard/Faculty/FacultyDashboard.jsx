import React from "react";
import FacultyCharts from "./FacultyCharts";
import FacultyDashboardCard from "./FacultyDashboardCard";

export default function StaffDashboard({stats}) {
    return (
        <>
            <FacultyDashboardCard stats={stats}/>
            <FacultyCharts/>
        </>
    );
}
