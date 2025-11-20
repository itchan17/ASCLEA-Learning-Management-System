import React from "react";
import { PiNotebookFill, PiStudentFill } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdRateReview, MdAccessTimeFilled } from "react-icons/md";
import DashboardCard from "../Component/DashboardCard";

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

export default function StaffDashboardCard({ stats, totalTimeSpent }) {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <DashboardCard
                value={stats?.total_students || 0}
                icon={<PiStudentFill className="text-ascend-blue" />}
                label="Total Students"
            />
            <DashboardCard
                value={stats.assigned_programs || 0}
                icon={<MdRateReview className="text-[#FF663C]" />}
                label="Programs Assigned"
            />
            <DashboardCard
                value={stats?.assigned_courses || 0}
                icon={<PiNotebookFill className="text-ascend-yellow" />}
                label="Courses Assigned"
            />
            <DashboardCard
                value={formatHours(totalTimeSpent)}
                icon={<MdAccessTimeFilled className="text-ascend-black" />}
                label="Total Time Spent"
            />
        </div>
    );
}
