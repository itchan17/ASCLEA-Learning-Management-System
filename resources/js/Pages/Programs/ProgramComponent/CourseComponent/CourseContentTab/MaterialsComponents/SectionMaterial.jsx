import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function SectionMaterial() {
    return (
        <div className="flex items-center gap-2 md:gap-20 justify-between p-5 text-ascend-black border border-ascend-gray1 cursor-pointer">
            <h1 className="text-size2 font-bold break-words flex-1 min-w-0">
                1. Material 1
            </h1>

            <div className="dropdown dropdown-end cursor-pointer">
                <div
                    tabIndex={0}
                    role="button"
                    className="rounded-4xl p-1 -mr-1 hover:bg-ascend-lightblue transition-all duration-300"
                >
                    <BsThreeDotsVertical className="text-size3" />
                </div>

                <ul
                    tabIndex={0}
                    className="dropdown-content menu space-y-2 font-bold bg-ascend-white w-32 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                >
                    <li>
                        <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                            Edit
                        </a>
                    </li>
                    <li>
                        <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
