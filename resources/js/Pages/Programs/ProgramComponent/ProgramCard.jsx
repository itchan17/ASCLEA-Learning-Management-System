import React from "react";
import { router } from "@inertiajs/react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function ProgramCard({ programName, programId }) {
    const handleCardClick = () => {
        router.visit(`/programs/${programId}`);
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            onClick={handleCardClick}
            className="relative border border-ascend-gray1 shadow-shadow1 w-full max-w-80 h-58 flex flex-col cursor-pointer hover:-translate-y-2 transition-all duration-300 group"
        >
            <div className="bg-ascend-gray1 w-full h-full p-2 flex justify-end font-nunito-sans"></div>
            <div
                className="absolute top-2 right-2 dropdown dropdown-end"
                onClick={stopPropagation}
            >
                <BsThreeDotsVertical
                    tabIndex={0}
                    role="button"
                    className="text-size5 text-ascend-white"
                />

                <ul
                    tabIndex={0}
                    className="dropdown-content menu mt-2 bg-ascend-white w-32 px-0 border border-ascend-gray1 shadow-lg !transition-none"
                >
                    <li>
                        <a className="w-full text-left hover:bg-ascend-lightblue transition duration-300">
                            Edit
                        </a>
                    </li>
                    <li>
                        <a className="w-full text-left hover:bg-ascend-lightblue transition duration-300">
                            Remove
                        </a>
                    </li>
                </ul>
            </div>
            <div className="h-16 px-5 flex items-center">
                <h1 className="font-bold overflow-hidden text-ellipsis text-nowrap group-hover:text-ascend-blue transition-all duration-300">
                    {programName}
                </h1>
            </div>
        </div>
    );
}
