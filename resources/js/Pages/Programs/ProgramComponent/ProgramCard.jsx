import React from "react";
import { router } from "@inertiajs/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../../../../css/global.css";
import { useRoute } from "ziggy-js";
import useProgramStore from "../../../Stores/Programs/programStore";
import { closeDropDown } from "../../../Utils/closeDropdown";

export default function ProgramCard({
    programDetails,
    setIsModalOpen,
    setEditProgram,
}) {
    // Const Program Store
    const setProgram = useProgramStore((state) => state.setProgram);
    const deleteProgram = useProgramStore((state) => state.deleteProgram);

    const route = useRoute();
    const handleCardClick = () => {
        router.visit(route("program.view", programDetails.id));
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleEditClick = () => {
        setIsModalOpen(true);
        setProgram(programDetails);
        setEditProgram(true);

        // Close the dropdown after clicked
        closeDropDown();
    };

    const handleArchiveClick = () => {
        deleteProgram(programDetails.id);

        // Close the dropdown after clicked
        closeDropDown();
    };
    return (
        <div
            onClick={handleCardClick}
            className="relative border border-ascend-gray1 shadow-shadow1 w-full max-w-80 h-58 flex flex-col cursor-pointer card-hover group"
        >
            <div className="bg-ascend-gray1 w-full h-full p-2 flex justify-end font-nunito-sans"></div>
            <div
                className="absolute top-2 right-[6px] dropdown dropdown-end"
                onClick={stopPropagation}
            >
                <div
                    tabIndex={0}
                    role="button"
                    className="p-[2px] rounded-4xl hover:bg-ascend-lightblue/35 transition-all duration-300"
                >
                    <BsThreeDotsVertical className="text-size5 text-ascend-white" />
                </div>

                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-ascend-white w-36 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                >
                    <li onClick={handleEditClick}>
                        <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                            Edit program
                        </a>
                    </li>
                    <li onClick={handleArchiveClick}>
                        <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                            Archive program
                        </a>
                    </li>
                </ul>
            </div>
            <div className="h-16 px-5 flex items-center">
                <h1 className="font-bold overflow-hidden text-ellipsis text-nowrap group-hover:text-ascend-blue transition-all duration-300">
                    {programDetails.programName}
                </h1>
            </div>
        </div>
    );
}
