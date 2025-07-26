import React from "react";
import Loader from "../Loader";

export default function PrimaryButton({
    doSomething,
    icon,
    text,
    textColor,
    btnColor,
    btnType = "button",
    isDisabled = false,
}) {
    return (
        <button
            type={btnType}
            onClick={doSomething}
            disabled={isDisabled}
            className={`px-5 h-10 space-x-1 ${
                btnColor || "bg-ascend-blue"
            } hover:opacity-80 flex items-center justify-center cursor-pointer text-ascend-white transition-all duration-300`}
        >
            {icon && <div className="text-size5">{icon}</div>}
            {isDisabled ? (
                <Loader />
            ) : (
                <span className={`font-semibold ${textColor}`}>{text}</span>
            )}
        </button>
    );
}
