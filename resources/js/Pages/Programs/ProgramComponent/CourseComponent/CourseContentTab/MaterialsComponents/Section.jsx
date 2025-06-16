import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import SectionMaterial from "./SectionMaterial";
import SectionAssessment from "./SectionAssessment";
import MaterialForm from "./MaterialForm";

export default function Section({ sectionTitle }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMaterialFormOpen, setIsMaterialFormOpen] = useState(false);
    const targetForm = useRef(null);

    const toggleOpenMaterialForm = () => {
        setIsMaterialFormOpen(!isMaterialFormOpen);
    };

    const addSectionDropdown = () => {
        // Open form if close
        if (!isMaterialFormOpen) {
            setIsMaterialFormOpen(!isMaterialFormOpen);
        }

        // Close the dropdown
        const elem = document.activeElement;
        console.log(elem);
        if (elem) {
            elem?.blur();
        }
    };

    const toggleArrow = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (isMaterialFormOpen) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isMaterialFormOpen]);
    return (
        <div className="shadow-shadow1">
            <div className="flex items-center gap-2 md:gap-20 justify-between pl-2 pr-5 py-2 text-ascend-white bg-ascend-blue">
                <div className="flex flex-1 min-w-0 items-center gap-2">
                    <IoIosArrowDown
                        onClick={toggleArrow}
                        className={`shrink-0 text-size5 ${
                            isExpanded ? "rotate-0" : "rotate-90"
                        } transition-all duration-300 cursor-pointer `}
                    />

                    <h1 className="text-size4 font-bold break-words min-w-0">
                        {sectionTitle}
                    </h1>
                </div>

                <div className="dropdown dropdown-end cursor-pointer">
                    <div
                        tabIndex={0}
                        role="button"
                        className="rounded-4xl p-1 -mr-1 transition-all duration-300 hover:bg-ascend-lightblue/10"
                    >
                        <BsThreeDotsVertical className="text-size3" />
                    </div>

                    <ul
                        tabIndex={0}
                        className="dropdown-content menu font-bold space-y-2 bg-ascend-white min-w-36 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                    >
                        <li onClick={addSectionDropdown}>
                            <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                Add material
                            </a>
                        </li>
                        <li>
                            <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                Add assessment
                            </a>
                        </li>
                        <li>
                            <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                Edit section title
                            </a>
                        </li>
                        <li>
                            <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                Delete section
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                className={`border-r border-l border-b border-ascend-gray1 transition-all duration-300 space-y-5 ease-in-out ${
                    isExpanded ? "h-full p-5" : "h-0 px-5 py-0"
                }`}
            >
                {isMaterialFormOpen && (
                    <div ref={targetForm}>
                        <MaterialForm
                            toggleOpenMaterialForm={toggleOpenMaterialForm}
                        />
                    </div>
                )}
                {isExpanded && (
                    <>
                        <SectionMaterial />
                        <SectionAssessment />
                    </>
                )}
            </div>
        </div>
    );
}
