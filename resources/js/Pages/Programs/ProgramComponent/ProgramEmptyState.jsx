import React from "react";

export default function ProgramEmptyState() {
    return (
        <div className="w-full flex flex-col justify-center items-center h-full py-20">
            <img
                src="/images/illustrations/launch.svg"
                alt=""
                className="w-[300px] md:w-[375px]"
            />
            <p className="text-size3 md:text-size5 sm:w-100 text-wrap text-center italic">
                “No programs? Time to fill this space to start learning
                adventures!”
            </p>
        </div>
    );
}
