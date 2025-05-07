import React from "react";

export default function PrimaryButton({
    doSomething,
    icon,
    text,
    textColor,
    btnColor,
}) {
    return (
        <button
            onClick={doSomething}
            className={`px-5 h-10 space-x-1 ${
                btnColor || "bg-ascend-blue"
            } hover:opacity-80 flex items-center justify-center cursor-pointer text-ascend-white transition-all duration-300`}
        >
            {icon && <div className="text-xl ">{icon}</div>}
            <span className={`font-semibold ${textColor}`}>{text}</span>
        </button>
    );
}
