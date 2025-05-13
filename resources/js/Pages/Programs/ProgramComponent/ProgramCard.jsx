import React from "react";

export default function ProgramCard({ programName }) {
    return (
        <div className="border border-ascend-gray1 shadow-shadow1 w-80 h-58 flex flex-col cursor-pointer hover:transform group hover:-translate-y-2 transition-all duration-300">
            <div className="bg-ascend-gray1 w-full h-full"></div>
            <div className="h-16 px-5 flex items-center">
                <h1 className="font-bold overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-ascend-blue transition-all duration-300">
                    {programName}
                </h1>
            </div>
        </div>
    );
}
