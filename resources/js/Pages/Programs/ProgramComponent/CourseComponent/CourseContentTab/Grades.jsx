import React from "react";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import { IoCaretDownOutline } from "react-icons/io5";
import GradesTable from "./GradesComponents/GradesTable";

export default function Grades() {
    return (
        <div className="font-nunito-sans text-ascend-black space-y-5">
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <h1 className="text-size6 font-bold">Course Title</h1>

                <div className="flex space-x-[0.5px]">
                    <PrimaryButton text="Download" />

                    {/* Dropdown button */}
                    <div className="dropdown dropdown-end cursor-pointer ">
                        <button
                            tabIndex={0}
                            role="button"
                            className="px-3 h-10 bg-ascend-blue hover:opacity-80 flex items-center justify-center cursor-pointer text-ascend-white transition-all duration-300"
                        >
                            <div className="text-size1 ">
                                {<IoCaretDownOutline />}
                            </div>
                        </button>

                        <ul
                            tabIndex={0}
                            className="text-size2 dropdown-content menu space-y-2 font-bold bg-ascend-white min-w-40 mt-1 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                        >
                            <li>
                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Download as pdf
                                </a>
                            </li>
                            <li>
                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Download as csv
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <GradesTable />
        </div>
    );
}
