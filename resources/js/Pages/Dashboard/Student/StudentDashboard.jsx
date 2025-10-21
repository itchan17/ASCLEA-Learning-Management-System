import React from "react";
import PastAssessments from "./PastAssessments";
import UpcomingAssessments from "./UpcomingAssessments";
import StudentCharts from "./StudentCharts";
import StudentDashboardCard from "./StudentDashboardCard";

export default function StudentDashboard({total_learning_hours, total_assigned_courses}) {
    return (
        <>
            <StudentDashboardCard total_learning_hours={total_learning_hours} total_assigned_courses={total_assigned_courses}/>
            <StudentCharts />
            <UpcomingAssessments />
            <PastAssessments />
        </>
    );
}
