import { useState, useRef, useEffect } from "react";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import MaterialForm from "./MaterialsComponents/MaterialForm";
import useModulesStore from "../../../../../Stores/Programs/CourseContent/modulesStore";
import EmptyState from "../../../../../Components/EmptyState/EmptyState";
import MaterialItem from "./MaterialsComponents/MaterialItem";
import { IoCaretDownOutline } from "react-icons/io5";
import SectionForm from "./MaterialsComponents/SectionForm";
import Section from "./MaterialsComponents/Section";
import { IoIosArrowDown } from "react-icons/io";

export default function Materials() {
    // Materials Store
    const materialList = useModulesStore((state) => state.materialList);
    const sectionList = useModulesStore((state) => state.sectionList);

    const [isMaterialFormOpen, setIsMaterialFormOpen] = useState(false);
    const [isSectionFormOpen, setIsSectionFormOpen] = useState(false);
    const [isMaterialsExpanded, setIsMaterialsExpanded] = useState(true);
    const [isSectionsExpanded, setIsSectionsExpanded] = useState(true);
    const targetForm = useRef(null);

    const toggleMaterialsArrow = () => {
        setIsMaterialsExpanded(!isMaterialsExpanded);
    };

    const toggleSectionsArrow = () => {
        setIsSectionsExpanded(!isSectionsExpanded);
    };

    // Toggle Material form through button
    const toggleOpenMaterialForm = () => {
        if (isSectionFormOpen && !isMaterialFormOpen) {
            setIsSectionFormOpen(!isSectionFormOpen);
        }
        setIsMaterialFormOpen(!isMaterialFormOpen);
    };

    // Toggle Section form
    const toggleOpenSectionForm = () => {
        setIsSectionFormOpen(!isSectionFormOpen);
    };

    const addMaterialDropdown = () => {
        // Open form if close and close section form if open
        if (isSectionFormOpen) {
            setIsSectionFormOpen(!isSectionFormOpen);
        }
        if (!isMaterialFormOpen) {
            toggleOpenMaterialForm();
        }

        // Close the dropdown
        const elem = document.activeElement;
        console.log(elem);
        if (elem) {
            elem?.blur();
        }
    };

    const addSectionDropdown = () => {
        // Open form if close
        if (isMaterialFormOpen) {
            setIsMaterialFormOpen(!isMaterialFormOpen);
        }
        if (!isSectionFormOpen) {
            setIsSectionFormOpen(!isSectionFormOpen);
        }

        // Close the dropdown
        const elem = document.activeElement;
        console.log(elem);
        if (elem) {
            elem?.blur();
        }
    };

    // Scroll into the form once opened
    useEffect(() => {
        if (isMaterialFormOpen || isSectionFormOpen) {
            console.log(targetForm.current);
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isMaterialFormOpen, isSectionFormOpen]);

    return (
        <div className="font-nunito-sans text-ascend-black space-y-5">
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <h1 className="text-size6 font-bold">Course Modules</h1>

                <div className="flex space-x-[0.5px]">
                    <PrimaryButton
                        doSomething={toggleOpenMaterialForm}
                        isDisabled={isMaterialFormOpen}
                        text="Add Material"
                    />

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
                            className="text-size2 dropdown-content menu space-y-2 font-bold bg-ascend-white min-w-36 mt-1 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                        >
                            <li onClick={addMaterialDropdown}>
                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Add material
                                </a>
                            </li>
                            <li onClick={addSectionDropdown}>
                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Add section
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Open the material form */}
            {isMaterialFormOpen ? (
                <div ref={targetForm}>
                    <MaterialForm
                        toggleOpenMaterialForm={toggleOpenMaterialForm}
                    />
                </div>
            ) : isSectionFormOpen ? (
                <div ref={targetForm}>
                    <SectionForm
                        toggleOpenSectionForm={toggleOpenSectionForm}
                    />
                </div>
            ) : null}

            {/* Condition to display empty state when no material */}
            <div className="flex flex-col space-y-5">
                <div className="flex items-center space-x-5">
                    <IoIosArrowDown
                        onClick={toggleMaterialsArrow}
                        className={`shrink-0 text-size5 ${
                            isMaterialsExpanded ? "rotate-0" : "rotate-90"
                        } transition-all duration-300 cursor-pointer `}
                    />

                    <h1 className="text-size4 font-bold">Materials</h1>
                    <div className="w-full h-[0.5px] bg-ascend-gray1"></div>
                </div>
                {isMaterialsExpanded &&
                    materialList.map((material, index) => (
                        <MaterialItem key={index} materialDetails={material} />
                    ))}
            </div>
            <div className="flex flex-col space-y-5">
                <div className="flex items-center space-x-5">
                    <IoIosArrowDown
                        onClick={toggleSectionsArrow}
                        className={`shrink-0 text-size5 ${
                            isSectionsExpanded ? "rotate-0" : "rotate-90"
                        } transition-all duration-300 cursor-pointer `}
                    />

                    <h1 className="text-size4 font-bold">Sections</h1>
                    <div className="w-full h-[0.5px] bg-ascend-gray1"></div>
                </div>

                {/* Display the list of sections */}
                {isSectionsExpanded &&
                    sectionList &&
                    sectionList.map((section, index) => (
                        <Section key={index} sectionDetails={section} />
                    ))}
            </div>

            {/* {materialList?.length > 0 ? (
                <MaterialItem />
            ) : (
                <EmptyState
                    imgSrc={"/images/illustrations/empty.svg"}
                    text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
                />
            )} */}
        </div>
    );
}
