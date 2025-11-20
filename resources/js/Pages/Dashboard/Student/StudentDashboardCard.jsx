import React from "react";
import DashboardCard from "../Component/DashboardCard";
import { MdTask, MdQuiz, MdAccessTimeFilled } from "react-icons/md";
import { RiFileList2Fill } from "react-icons/ri";

function formatHours(decimalHours) {
    if (!decimalHours || decimalHours === 0) 
        return <span>0 <span className="text-sm">mins</span></span>;

    const totalMinutes = Math.round(decimalHours * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) 
        return <span>{minutes} <span className="text-sm">mins</span></span>;

    return (
        <span>
            {hours}:{minutes.toString().padStart(2, "0")} 
            <span className="text-sm"> hrs</span>
        </span>
    );
}

/*function formatHours(decimalHours) {
    if (!decimalHours || decimalHours === 0) return "0 mins";

    const totalMinutes = Math.round(decimalHours * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} mins`;
    return `${hours}:${minutes.toString().padStart(2, "0")} hrs`;
}*/

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
                value={formatHours(total_learning_hours)}
                icon={<MdAccessTimeFilled className="text-[#FF663C]" />}
                label="Total Learning Time"
            />
        </div>
    );
}
