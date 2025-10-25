import React from "react";
import PastAssessments from "./PastAssessments";
import UpcomingAssessments from "./UpcomingAssessments";
import StudentCharts from "./StudentCharts";
import StudentDashboardCard from "./StudentDashboardCard";

export default function StudentDashboard({
    total_learning_hours, 
    total_assigned_courses, 
    dailyTimeSpent, 
    total_submitted_assessments, 
    average_quiz_score
    }) {
    return (
        <>
            <StudentDashboardCard 
                total_learning_hours={total_learning_hours} 
                total_assigned_courses={total_assigned_courses} 
                total_submitted_assessments={total_submitted_assessments} 
                average_quiz_score={average_quiz_score}/>
            <StudentCharts 
                dailyTimeSpent={dailyTimeSpent}/>
            <UpcomingAssessments />
            <PastAssessments />
        </>
    );
}
