import React from "react";

export default function DefaultCustomToast({ message }) {
    return (
        <span className="text-size3 font-bold text-ascend-black font-nunito-sans">
            {message}
        </span>
    );
}
