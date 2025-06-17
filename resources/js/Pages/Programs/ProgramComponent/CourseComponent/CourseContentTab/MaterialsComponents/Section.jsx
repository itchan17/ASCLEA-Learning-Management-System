import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import SectionContentList from "./SectionContentList";
import MaterialForm from "./MaterialForm";
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
import PrimaryButton from "../../../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../../../Components/Button/SecondaryButton";
import { isEqual, cloneDeep } from "lodash";

export default function Section({ sectionTitle }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMaterialFormOpen, setIsMaterialFormOpen] = useState(false);
    const targetForm = useRef(null);
    const [isButtonDisplayed, setIsButtonDisyplayed] = useState(false);
    const [sectionContent, setSectionContent] = useState([
        {
            id: 1,
            title: "Preliminary Assessment",
            sortOrder: 1,
        },
        {
            id: 2,
            title: "Chapter 1: Introduction to Physics",
            sortOrder: 2,
        },
        {
            id: 3,
            title: "Midterm Exam",
            sortOrder: 3,
        },
        {
            id: 4,
            title: "Lesson: Newton's Laws of Motion",
            sortOrder: 4,
        },
        {
            id: 5,
            title: "Final Assessment",
            sortOrder: 5,
        },
        {
            id: 6,
            title: "Supplementary Material: Problem Solving Strategies",
            sortOrder: 6,
        },
        {
            id: 7,
            title: "Chapter 2: Motion in One Dimension",
            sortOrder: 7,
        },
        {
            id: 8,
            title: "Lesson: Displacement, Velocity, and Acceleration",
            sortOrder: 8,
        },
        {
            id: 9,
            title: "Quiz: Kinematics",
            sortOrder: 9,
        },
        {
            id: 10,
            title: "Chapter 3: Forces and Newton’s Laws",
            sortOrder: 10,
        },
        {
            id: 11,
            title: "Lesson: Free-Body Diagrams",
            sortOrder: 11,
        },
        {
            id: 12,
            title: "Lab Activity: Measuring Acceleration",
            sortOrder: 12,
        },
        {
            id: 13,
            title: "Chapter 4: Work and Energy",
            sortOrder: 13,
        },
        {
            id: 14,
            title: "Lesson: Kinetic and Potential Energy",
            sortOrder: 14,
        },
        {
            id: 15,
            title: "Quiz: Work-Energy Theorem",
            sortOrder: 15,
        },
        {
            id: 16,
            title: "Supplementary Material: Physics Formula Sheet",
            sortOrder: 16,
        },
    ]);
    const [origOrder, setOrigOrder] = useState(cloneDeep(sectionContent));

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
        setIsMaterialFormOpen(false);
        setIsExpanded(!isExpanded);
        setSectionContent(cloneDeep(origOrder));
        setIsButtonDisyplayed(false);
    };

    useEffect(() => {
        if (isMaterialFormOpen) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isMaterialFormOpen]);

    // Helper function for getting the index
    const getSectionContentPos = (id) =>
        sectionContent.findIndex((content) => content.id === id);

    // Function for sorting the array
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id === over.id) return;

        setSectionContent((sectionContent) => {
            const originalPos = getSectionContentPos(active.id);
            const newPos = getSectionContentPos(over.id);

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
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        // Check if the array changed
        if (!isEqual(origOrder, sectionContent)) {
            console.log(sectionContent);
            setIsButtonDisyplayed(true);
            console.log("Section content changed!");
        }
    }, [sectionContent]);

    const cancelSort = () => {
        console.log(origOrder);
        setSectionContent(cloneDeep(origOrder));
        setIsButtonDisyplayed(false);
    };

    const saveNewOrder = () => {
        setIsButtonDisyplayed(false);
        setOrigOrder(cloneDeep(sectionContent));
        console.log(origOrder);
    };

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
                        <li>
                            <a className="w-full text-left hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                Publish
                            </a>
                        </li>
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
                        <div ref={targetForm} className="mb-3">
                            <MaterialForm
                                toggleOpenMaterialForm={toggleOpenMaterialForm}
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
                            />
                        </DndContext>
                    )}
                </div>
                {isButtonDisplayed && (
                    <div className="flex justify-end gap-2 mt-2 mb-5 mx-5">
                        <SecondaryButton
                            doSomething={cancelSort}
                            text={"Cancel"}
                        />
                        <PrimaryButton
                            doSomething={saveNewOrder}
                            text={"Save Order"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
