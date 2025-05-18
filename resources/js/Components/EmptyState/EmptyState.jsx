import React from "react";

export default function EmptyState({ imgSrc, text, paddingY = "py-20" }) {
    return (
        <div
            className={`w-full flex flex-col justify-center items-center h-full ${paddingY}`}
        >
            <img src={imgSrc} alt="" className="w-[300px] md:w-[375px]" />
            <p className="text-size3 md:text-size5 sm:w-100 text-wrap text-center italic">
                {text}
            </p>
        </div>
    );
}
