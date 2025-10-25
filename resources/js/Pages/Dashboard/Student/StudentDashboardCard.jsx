import React from "react";
import DashboardCard from "../Component/DashboardCard";
import { MdTask, MdQuiz, MdAccessTimeFilled } from "react-icons/md";
import { RiFileList2Fill } from "react-icons/ri";

export default function StudentDashboardCard() {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <DashboardCard
                value="60"
                icon={<MdTask className="text-ascend-blue" />}
                label="Assessments Completed"
            />
            <DashboardCard
                value="90%"
                icon={<MdQuiz className="text-ascend-yellow" />}
                label="Average Quiz Score"
            />
            <DashboardCard
                value="5/10"
                icon={<RiFileList2Fill className="text-ascend-black" />}
                label="Total Finished Courses"
            />
            <DashboardCard
                value="60"
                icon={<MdAccessTimeFilled className="text-[#FF663C]" />}
                label="Total Learning Hours"
            />
        </div>
    );
}
