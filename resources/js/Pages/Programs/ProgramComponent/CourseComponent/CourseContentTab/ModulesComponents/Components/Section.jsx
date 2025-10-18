import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import SectionContentList from "./SectionContentList";
import MaterialForm from "./MaterialForm";
import AssessmentForm from "../../AssessmentsComponents/AssessmentForm";
import {
    closestCorners,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensors,
    useSensor,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import PrimaryButton from "../../../../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../../../../Components/Button/SecondaryButton";
import { isEqual, cloneDeep } from "lodash";
import useModulesStore from "../Stores/modulesStore";
import RoleGuard from "../../../../../../../Components/Auth/RoleGuard";

export default function Section({ sectionDetails }) {
    // Modules store
    const updateSectionStatus = useModulesStore(
        (state) => state.updateSectionStatus
    );

    const [isExpanded, setIsExpanded] = useState(false);
    const [isMaterialFormOpen, setIsMaterialFormOpen] = useState(false);
    const [isAssessmentFormOpen, setIsAssessmentFormOpen] = useState(false);
    const [isButtonDisplayed, setIsButtonDisyplayed] = useState(false);
    const [sectionContent, setSectionContent] = useState(
        sectionDetails.sectionContentList
    );

    // Pass to the material form component for cancelling the form
    const toggleOpenMaterialForm = () => {
        setIsMaterialFormOpen(!isMaterialFormOpen);
    };

    // Pass to the asessment form component for cancelling the form
    const toggleOpenAssessmentForm = () => {
        setIsAssessmentFormOpen(!isAssessmentFormOpen);
    };

    // Open material or assessment form
    const openForm = (e) => {
        // Open form if close
        if (
            e.currentTarget.getAttribute("name") === "add-material" &&
            !isMaterialFormOpen
        ) {
            if (isAssessmentFormOpen) {
                setIsAssessmentFormOpen(!isAssessmentFormOpen);
                setIsMaterialFormOpen(!isMaterialFormOpen);
            } else {
                setIsMaterialFormOpen(!isMaterialFormOpen);
            }
        } else if (
            e.currentTarget.getAttribute("name") === "add-assessment" &&
            !isAssessmentFormOpen
        ) {
            if (isMaterialFormOpen) {
                setIsMaterialFormOpen(!isMaterialFormOpen);
                setIsAssessmentFormOpen(!isAssessmentFormOpen);
            } else {
                setIsAssessmentFormOpen(!isAssessmentFormOpen);
            }
        }

        // Close the dropdown after clicked
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };

    const handleUpdateStatus = () => {
        updateSectionStatus(
            sectionDetails.id,
            sectionDetails.sectionStatus === "published"
                ? "unpublish"
                : "published"
        );

        // Close the dropdown after clicked
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };

    const toggleArrow = () => {
        setIsMaterialFormOpen(false);
        setIsExpanded(!isExpanded);
        setIsButtonDisyplayed(false);
    };
    console.log(sectionContent);

    // Helper function for getting the index
    const getSectionContentPos = (id) =>
        sectionContent.findIndex((content) => content.sortOrder === id);

    // Function for sorting the array
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id === over.id) return;
        const originalPos = getSectionContentPos(active.id);
        const newPos = getSectionContentPos(over.id);

        setSectionContent((sectionContent) => {
            const updatedOrder = arrayMove(
                sectionContent,
                originalPos,
                newPos
            ).map((item, index) => ({
                ...item,
                sortOrder: index + 1,
            }));

            return updatedOrder;
        });
    };

    // This allows drag and drop in mobile device
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
            activationConstraint: {
                distance: 8,
            },
        })
    );

    return (
        <div className="shadow-shadow1">
            <div className="flex items-center gap-2 md:gap-20 justify-between pl-2 pr-5 py-3 text-ascend-white bg-ascend-blue">
                <div className="flex flex-1 min-w-0 items-center gap-2">
                    <IoIosArrowDown
                        onClick={toggleArrow}
                        className={`shrink-0 text-size5 ${
                            isExpanded ? "rotate-0" : "rotate-90"
                        } transition-all duration-300 cursor-pointer `}
                    />

                    <h1 className="text-size4 font-bold break-words min-w-0">
                        {sectionDetails.sectionTitle}
                    </h1>

                    {/* Set the status label */}
                    {sectionDetails.sectionStatus === "published" ? (
                        <div className="px-2 bg-ascend-green ">
                            <span className="text-size1 font-bold text-ascend-white">
                                Published
                            </span>
                        </div>
                    ) : (
                        <div className="px-2 bg-ascend-yellow ">
                            <span className="text-size1 font-bold text-ascend-white">
                                Unpublish
                            </span>
                        </div>
                    )}
                </div>
                <RoleGuard allowedRoles={["admin", "faculty"]}>
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
                            <li onClick={handleUpdateStatus}>
                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    {sectionDetails.sectionStatus ===
                                    "published"
                                        ? "Unpublish"
                                        : "Publish"}
                                </a>
                            </li>
                            <li name="add-material" onClick={openForm}>
                                <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                    Add material
                                </a>
                            </li>
                            <li name="add-assessment" onClick={openForm}>
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
                </RoleGuard>
            </div>

            <div
                className={`border-r bg-ascend-lightblue border-l border-b border-ascend-gray1  ${
                    isExpanded ? "h-full" : "h-0 px-5 py-0"
                }`}
            >
                <div
                    className={`max-h-[500px] overflow-y-auto ${
                        isExpanded ? "p-5" : "px-5 py-0"
                    }`}
                >
                    {isMaterialFormOpen && (
                        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
                            <MaterialForm
                                toggleOpenMaterialForm={toggleOpenMaterialForm}
                                formTitle={"Add Section Material"}
                                formWidth={"w-200"}
                                sectionId={sectionDetails.id}
                            />
                        </div>
                    )}
                    {isAssessmentFormOpen && (
                        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
                            <AssessmentForm
                                toggleForm={toggleOpenAssessmentForm}
                                formTitle={"Add Section Assessment"}
                                formWidth={"w-200"}
                                sectionId={sectionDetails.id}
                            />
                        </div>
                    )}
                    {isExpanded && (
                        <DndContext
                            sensors={sensors}
                            onDragEnd={handleDragEnd}
                            collisionDetection={closestCorners}
                        >
                            <SectionContentList
                                sectionContent={sectionContent}
                                sectionStatus={sectionDetails.sectionStatus}
                            />
                        </DndContext>
                    )}
                </div>
            </div>
        </div>
    );
}
