import React from "react";
import DashboardCard from "../Component/DashboardCard";
import { MdTask, MdQuiz, MdAccessTimeFilled } from "react-icons/md";
import { RiFileList2Fill } from "react-icons/ri";

export default function StudentDashboardCard({
        total_learning_hours, 
        total_assigned_courses, 
        total_submitted_assessments, 
        average_quiz_score
    }) {
    console.log("Number of Submissions: ", total_submitted_assessments);
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <DashboardCard
                value={total_submitted_assessments || 0}
                icon={<MdTask className="text-ascend-blue" />}
                label="Assessments Completed"
            />
            <DashboardCard
                value={`${average_quiz_score}%` || 0}
                icon={<MdQuiz className="text-ascend-yellow" />}
                label="Average Quiz Score"
            />
            <DashboardCard
                value={total_assigned_courses || 0}
                icon={<RiFileList2Fill className="text-ascend-black" />}
                label="Total Assigned Courses"
            />
            <DashboardCard
                value={total_learning_hours || 0}
                icon={<MdAccessTimeFilled className="text-[#FF663C]" />}
                label="Total Learning Hours"
            />
        </div>
    );
}
