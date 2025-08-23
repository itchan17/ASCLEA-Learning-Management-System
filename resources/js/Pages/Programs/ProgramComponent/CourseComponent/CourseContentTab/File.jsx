import React from "react";
import { AiFillFile } from "react-icons/ai";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

export default function File({ fileName, onClick }) {
    const route = useRoute();

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className="flex h-15 items-center space-x-4 p-2 border border-ascend-gray1 bg-ascend-white cursor-pointer hover-change-bg-color shadow-shadow2 group"
        >
            <div className="w-full flex overflow-hidden font-semibold font-nunito-sans text-ascebd-black">
                <AiFillFile
                    className={`shrink-0 text-ascend-blue text-size5`}
                />
                <h4
                    title={fileName}
                    className="ml-2 truncate group-hover:underline"
                >
                    {fileName}
                </h4>
            </div>
        </div>
    );
}
