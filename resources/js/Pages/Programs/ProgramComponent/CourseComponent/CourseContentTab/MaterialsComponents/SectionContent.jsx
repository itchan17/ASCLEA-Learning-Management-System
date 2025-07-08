import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { MdOutlineDragIndicator } from "react-icons/md";

export default function SectionContent({ disabled, contentDetails }) {
    const route = useRoute();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        setActivatorNodeRef,
    } = useSortable({
        id: contentDetails.id,
        transition: {
            duration: 300, // milliseconds
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        },
        animateLayoutChanges: () => false,
        disabled,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const handleSectionContentClick = () => {
        console.log("Clicked");

        // Code here for route
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
            <div
                style={{ touchAction: "none" }}
                ref={setActivatorNodeRef}
                {...(!disabled && listeners)}
                className="flex justify-center cursor-grab py-1"
            >
                <MdOutlineDragIndicator className="rotate-90" />
            </div>
            <div className="flex items-center gap-2 md:gap-20 justify-between pr-5 pl-5 pb-5 text-ascend-black">
                <h1 className="text-size2 font-bold break-words flex-1 min-w-0">
                    {`${contentDetails.sortOrder}. `}
                    {contentDetails.title}
                </h1>

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
            </div>
        </div>
    );
}
