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
    isLoading = false,
    fontWeight = "font-semibold",
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
            {icon && !isLoading && <div className="text-size5">{icon}</div>}
            {isLoading ? (
                <Loader />
            ) : (
                <span className={`${fontWeight} ${textColor}`}>{text}</span>
            )}
        </button>
    );
}
