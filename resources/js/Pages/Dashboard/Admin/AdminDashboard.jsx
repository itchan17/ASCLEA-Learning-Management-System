import React from "react";
import AdminCharts from "./AdminCharts";
import AdminDashboardCard from "./AdminDashboardCard";

function AdminDashboard({ stats, studentsPerProgram, dailyLogins, avgTimePerDay }) {
    return (
        <>
            <AdminDashboardCard stats={stats} />
            <AdminCharts
                studentsPerProgram={studentsPerProgram}
                dailyLogins={dailyLogins}
                avgTimePerDay={avgTimePerDay}
            />
        </>
    );
}

// Memoize to prevent unnecessary re-renders
export default React.memo(AdminDashboard);

