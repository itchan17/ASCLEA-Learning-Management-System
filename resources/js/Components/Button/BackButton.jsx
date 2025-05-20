import React from "react";
import { GoArrowLeft } from "react-icons/go";

export default function BackButton({ doSomething }) {
    return (
        <div
            onClick={doSomething}
            className="cursor-pointer -ml-3 hover:bg-ascend-lightblue p-3 rounded-[100px] transition-all duration-300"
        >
            <GoArrowLeft className="text-size6" />
        </div>
    );
}
