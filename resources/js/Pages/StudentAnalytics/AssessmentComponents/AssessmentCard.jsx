import React from "react";

export default function AssessmentCard({ value, label, percentage }) {
    return (
            <div className="flex flex-col items-center justify-center border border-ascend-gray1 shadow-shadow1 h-36 w-64 p-6 font-bold space-y-2">
                <div className="flex flex-col items-center justify-center space-y-1 text-center">
                    <h1 className="text-size7 text-ascend-black">{value}</h1>
                    <span className="text-size1 text-ascend-gray2 truncate max-w-full">{percentage}</span>
                    <span className="text-size2 break-words max-w-full">{label}</span>
                </div>
            </div>
    );
}
