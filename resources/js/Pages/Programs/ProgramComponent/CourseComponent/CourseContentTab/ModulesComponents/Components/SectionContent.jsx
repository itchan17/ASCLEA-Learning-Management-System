import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { router, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { MdOutlineDragIndicator } from "react-icons/md";
import RoleGuard from "../../../../../../../Components/Auth/RoleGuard";

export default function SectionContent({ disabled, contentDetails }) {
    const route = useRoute();

    const { program, course } = usePage().props;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        setActivatorNodeRef,
    } = useSortable({
        id: contentDetails.order,
        transition: {
            duration: 300, // milliseconds
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        },
        animateLayoutChanges: () => false,
        disabled,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
    };

    const handleSectionContentClick = () => {
        console.log("Clicked");

        // Code here for route

        // To add the route for this it need to have a contentType that will check if its activity or assessment to specify the route
        // Currently cant make this functionality as data display in view assessment or view materials is coming from materialList or assessmentList
        // While data here is coming from sectionContentList inside sectionDetails
        // If coding backend started the data on view assessment or view materials should be directly coming from backend not on lists in the stores

        if (contentDetails.item_type === "App\\Models\\Programs\\Material") {
            router.visit(
                route("material.view", {
                    program: program.program_id,
                    course: course.course_id,
                    material: contentDetails.item.material_id,
                }),
                {
                    preserveScroll: false,
                }
            );
        } else {
            router.visit(
                route("program.course.assessment.view", {
                    program: program.program_id,
                    course: course.course_id,
                    assessment: contentDetails.item.assessment_id,
                }),
                {
                    preserveScroll: false,
                }
            );
        }
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    return (
        <div
            onClick={handleSectionContentClick}
            ref={setNodeRef}
            {...attributes}
            style={style}
            className="bg-ascend-white border border-ascend-gray1"
        >
            {!disabled && (
                <div
                    style={{ touchAction: "none" }}
                    ref={setActivatorNodeRef}
                    {...(!disabled && listeners)}
                    className="flex justify-center cursor-grab py-1"
                >
                    <MdOutlineDragIndicator className="rotate-90" />
                </div>
            )}
            <div
                className={`flex items-center gap-2 md:gap-20 justify-between pr-5 pl-5 pb-5 cursor-pointer ${
                    disabled ? "pt-5" : null
                } text-ascend-black`}
            >
                <h1 className="text-size2 font-bold break-words flex-1 min-w-0">
                    {`${contentDetails.order}. `}
                    {contentDetails.item_type ===
                    "App\\Models\\Programs\\Material"
                        ? contentDetails.item.material_title
                        : contentDetails.item.assessment_title}
                </h1>

                <RoleGuard allowedRoles={["admin", "faculty"]}>
                    <div
                        onClick={stopPropagation}
                        className="dropdown dropdown-end cursor-pointer"
                    >
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
                </RoleGuard>
            </div>
        </div>
    );
}
