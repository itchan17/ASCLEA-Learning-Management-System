import React from "react";

export default function Loader({ color = "bg-ascend-white", size = "sm" }) {
    return (
        <div className="w-full flex justify-center">
            <span
                className={`loading loading-bars ${color}  loading-${size}`}
            ></span>
        </div>
    );
}
