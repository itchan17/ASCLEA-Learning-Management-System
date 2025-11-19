import { useState } from "react";
import { router } from "@inertiajs/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../../../../css/global.css";
import { route } from "ziggy-js";
import useProgramStore from "../../../Stores/Programs/programStore";
import { closeDropDown } from "../../../Utils/closeDropdown";
import RoleGuard from "../../../Components/Auth/RoleGuard";
import DefaultCustomToast from "../../../Components/CustomToast/DefaultCustomToast";
import { displayToast } from "../../../Utils/displayToast";
import AlertModal from "../../../Components/AlertModal";

export default function ProgramCard({
    programDetails,
    setIsModalOpen,
    setEditProgram,
}) {
    // Program Store
    const setProgramDataToUpdate = useProgramStore(
        (state) => state.setProgramDataToUpdate
    );

    // States for alert modal
    const [openAlerModal, setOpenAlertModal] = useState(false);
    const [isArchiveLoading, setIsArchiveLoading] = useState(false);

    const handleCardClick = () => {
        router.visit(route("program.show", programDetails.program_id));
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleEditClick = () => {
        setIsModalOpen(true);
        setProgramDataToUpdate(programDetails); // Set the program details that will be passed on AddProgramForm to set the data of slected program to edit
        setEditProgram(true);
        closeDropDown(); // Close the dropdown after clicked
    };

    const archiveProgram = () => {
        // Send a delete request to server that will archiove program through soft delete
        setIsArchiveLoading(true);
        router.delete(route("program.archive", programDetails.program_id), {
            showProgress: false,
            onSuccess: (page) => {
                displayToast(
                    <DefaultCustomToast message={page.props.flash.success} />,
                    "success"
                );
            },
            onFinish: () => {
                setIsArchiveLoading(false);
                setOpenAlertModal(false);
            },
        });
    };

    const handleArchiveClick = () => {
        setOpenAlertModal(true);
        closeDropDown(); // Close the dropdown after clicked
    };

    return (
        <>
            {/* Display alert modal */}
            {openAlerModal && (
                <AlertModal
                    title={"Archive Confirmation"}
                    description={
                        "This program can only be restored after restoring its associated courses. If the program has no courses, it will be permanently deleted. Are you sure you want to archive it?"
                    }
                    closeModal={() => setOpenAlertModal(false)}
                    onConfirm={archiveProgram}
                    isLoading={isArchiveLoading}
                />
            )}

            <div
                onClick={handleCardClick}
                className="relative border border-ascend-gray1 shadow-shadow1 w-full max-w-80 h-58 flex flex-col cursor-pointer card-hover group"
            >
                <div
                    className={` w-full h-full p-2 flex justify-end font-nunito-sans bg-cover bg-center  ${
                        !programDetails.background_image && "bg-ascend-gray1"
                    }`}
                    style={
                        programDetails.background_image && {
                            backgroundImage: `url('/storage/${programDetails.background_image}')`,
                        }
                    }
                ></div>
                <RoleGuard allowedRoles={["admin"]}>
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
                </RoleGuard>

                <div className="h-16 px-5 flex items-center">
                    <h1 className="font-bold overflow-hidden text-ellipsis text-nowrap group-hover:text-ascend-blue transition-all duration-300">
                        {programDetails.program_name}
                    </h1>
                </div>
            </div>
        </>
    );
}
