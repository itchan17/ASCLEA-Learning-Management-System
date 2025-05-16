import React from "react";
import { GoArrowLeft } from "react-icons/go";

export default function BackButton({ doSomething }) {
    return (
        <div className="w-full flex">
            <div
                onClick={doSomething}
                className="cursor-pointer hover:bg-ascend-lightblue p-2 rounded-[100px]"
            >
                <GoArrowLeft className="text-size6" />
            </div>
        </div>
    );
}
