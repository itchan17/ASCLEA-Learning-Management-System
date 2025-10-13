import React from "react";
import AdminCharts from "./AdminCharts";
import AdminDashboardCard from "./AdminDashboardCard";

export default function StaffDashboard({ stats, studentsPerProgram }) {
    return (
        <>
            <AdminDashboardCard stats={stats} />
            <AdminCharts studentsPerProgram={studentsPerProgram} />
        </>
    );
}
