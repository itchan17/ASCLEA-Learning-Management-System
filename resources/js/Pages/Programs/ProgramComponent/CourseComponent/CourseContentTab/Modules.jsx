import { useState, useRef, useEffect } from "react";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import MaterialForm from "./ModulesComponents/Components/MaterialForm";
import useModulesStore from "./ModulesComponents/Stores/modulesStore";
import SectionForm from "./ModulesComponents/Components/SectionForm";
import RoleGuard from "../../../../../Components/Auth/RoleGuard";
import MaterialList from "./ModulesComponents/Components/MaterialList";
import SectionList from "./ModulesComponents/Components/SectionList";

export default function Modules() {
    const [isMaterialFormOpen, setIsMaterialFormOpen] = useState(false);
    const [isSectionFormOpen, setIsSectionFormOpen] = useState(false);
    const [activetab, setActiveTab] = useState("materials");
    const targetForm = useRef(null);

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

    const handleClickTab = (tab) => {
        setActiveTab(tab);

        // Always close the form when switching tab
        setIsMaterialFormOpen(false);
        setIsSectionFormOpen(false);
    };

    // Scroll into the form once opened
    useEffect(() => {
        if (isMaterialFormOpen || isSectionFormOpen) {
            targetForm.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [isMaterialFormOpen, isSectionFormOpen]);

    return (
        <div className="font-nunito-sans text-ascend-black space-y-5">
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <h1 className="text-size6 font-bold">Course Modules</h1>
                <RoleGuard allowedRoles={["admin", "faculty"]}>
                    <div className="flex space-x-[0.5px]">
                        <PrimaryButton
                            doSomething={
                                activetab === "materials"
                                    ? toggleOpenMaterialForm
                                    : toggleOpenSectionForm
                            }
                            isDisabled={isMaterialFormOpen || isSectionFormOpen}
                            text={
                                activetab === "materials"
                                    ? "Add Material"
                                    : "Add Sections"
                            }
                        />
                    </div>
                </RoleGuard>
            </div>

            <div className="w-full flex items-center overflow-x-auto space-x-1 font-nunito-sans text-ascend-black border-b border-ascend-gray1">
                <div
                    onClick={() => handleClickTab("materials")}
                    className={`py-1.5 px-6 cursor-pointer font-bold hover:text-ascend-blue transition-all duration-300 border-b-3 ${
                        activetab === "materials"
                            ? "border-ascend-blue text-ascend-blue"
                            : "border-ascend-white"
                    } hover:border-b-3 hover:border-ascend-blue`}
                >
                    <span>Materials</span>
                </div>
                <div
                    onClick={() => handleClickTab("sections")}
                    className={`py-1.5 px-6 cursor-pointer font-bold hover:text-ascend-blue transition-all duration-300 border-b-3 ${
                        activetab === "sections"
                            ? "border-ascend-blue text-ascend-blue"
                            : "border-ascend-white"
                    } hover:border-b-3 hover:border-ascend-blue`}
                >
                    <span>Sections</span>
                </div>
            </div>

            {/* Open the material form */}
            {isMaterialFormOpen ? (
                <div ref={targetForm}>
                    <MaterialForm
                        setIsMaterialFormOpen={setIsMaterialFormOpen}
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

            {/* For displaying the tab content */}
            {activetab === "materials" ? <MaterialList /> : <SectionList />}
        </div>
    );
}
