import React from "react";

export default function DashboardCard({ value, icon, label }) {
    return (
        <div className="flex flex-col items-start justify-center border border-ascend-gray1 shadow-shadow1 h-35 p-4 font-bold space-y-2">
            <h1 className="text-size7 text-ascend-black">{value}</h1>
            <div className="flex items-center justify-center space-x-2">
                <span className="text-size6 shrink-0">{icon}</span>
                <span className="text-ascend-black">{label}</span>
            </div>
        </div>
    );
}
