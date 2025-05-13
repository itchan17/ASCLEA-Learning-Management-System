import React from "react";

export default function SecondaryButton({
    doSomething,
    icon,
    text,
    textColor,
    borderColor,
    btnType = "button",
}) {
    return (
        <button
            type={btnType}
            onClick={doSomething}
            className={`px-5 h-10 space-x-1 ${
                borderColor || "border-ascend-blue"
            } bg-ascend-white border-[2px] hover:opacity-80 flex items-center justify-center cursor-pointer text-ascend-white transition-all duration-300`}
        >
            {icon && <div className="text-xl ">{icon}</div>}
            <span
                className={`font-semibold ${textColor || "text-ascend-blue"}`}
            >
                {text}
            </span>
        </button>
    );
}
