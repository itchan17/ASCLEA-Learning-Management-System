import React from "react";
import { AiFillFile } from "react-icons/ai";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { AiFillCloseCircle } from "react-icons/ai";

export default function File({
    fileName,
    onClick,
    withRemove = false,
    onRemove,
}) {
    const route = useRoute();

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className="flex h-15 items-center space-x-4 p-2 border border-ascend-gray1 bg-ascend-white cursor-pointer hover-change-bg-color group"
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

            {withRemove && (
                <button
                    onClick={onRemove}
                    type="button"
                    className="cursor-pointer"
                >
                    <AiFillCloseCircle
                        className={`text-ascend-blue hover:opacity-80 transition-all duration-300 
                                            text-size5`}
                    />
                </button>
            )}
        </div>
    );
}
