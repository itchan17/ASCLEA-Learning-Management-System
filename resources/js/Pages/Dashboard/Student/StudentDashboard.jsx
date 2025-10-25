import React from "react";
import PastAssessments from "./PastAssessments";
import UpcomingAssessments from "./UpcomingAssessments";
import StudentCharts from "./StudentCharts";
import StudentDashboardCard from "./StudentDashboardCard";

export default function StudentDashboard() {
    return (
        <>
            <StudentDashboardCard />
            <StudentCharts />
            <UpcomingAssessments />
            <PastAssessments />
        </>
    );
}
