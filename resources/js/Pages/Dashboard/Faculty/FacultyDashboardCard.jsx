import React from "react";
import { PiNotebookFill, PiStudentFill } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";
import DashboardCard from "../Component/DashboardCard";

export default function StaffDashboardCard({ stats }) {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <DashboardCard
                value={stats?.total_students || 0}
                icon={<PiStudentFill className="text-ascend-blue" />}
                label="Total Students"
            />
            <DashboardCard
                value="0"
                icon={
                    <span className="text-size5 relative">
                        <BsFillPeopleFill />
                        <div className="absolute -right-1 bottom-0 bg-ascend-green w-[10px] h-[10px] rounded-xl" />
                    </span>
                }
                label="Online Students"
            />
            <DashboardCard
                value={stats?.assigned_courses || 0}
                icon={<PiNotebookFill className="text-ascend-yellow" />}
                label="Courses Assigned"
            />
            <DashboardCard
                value="21"
                icon={<MdRateReview className="text-[#FF663C]" />}
                label="Pending Grading"
            />
        </div>
    );
}
