import React from "react";
import { router } from "@inertiajs/react";

export default function ProgramSAcard({ programName, ProgramID }) {
    const handleCardClick = () => {
        router.visit(`/student-analytics/${ProgramID}`);
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            onClick={handleCardClick}
            className="relative border border-ascend-gray1 shadow-shadow1 w-full max-w-80 h-58 flex flex-col cursor-pointer hover:-translate-y-2 transition-all duration-300 group"
        >
            <div className="bg-ascend-gray1 w-full h-full p-2 flex justify-end font-nunito-sans"></div>
            <div
                className="absolute top-2 right-[6px] dropdown dropdown-end"
                onClick={stopPropagation}
            >
                <div
                    tabIndex={0}
                    role="button"
                    className="p-[2px] rounded-4xl hover:bg-ascend-lightblue/35 transition-all duration-300"
                >
                </div>
            </div>
            <div className="h-16 px-5 flex items-center">
                <h1 className="font-bold overflow-hidden text-ellipsis text-nowrap group-hover:text-ascend-blue transition-all duration-300">
                    {programName}
                </h1>
            </div>
        </div>
    );
}
