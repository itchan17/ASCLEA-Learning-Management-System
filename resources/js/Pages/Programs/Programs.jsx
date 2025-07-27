import { useState, useEffect } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import AddProgramForm from "./ProgramComponent/AddProgramForm";
import useProgramStore from "../../Stores/Programs/programStore";
import ProgramCard from "./ProgramComponent/ProgramCard";
import EmptyState from "../../Components/EmptyState/EmptyState";
import RoleGuard from "../../Components/Auth/RoleGuard";
import { usePage } from "@inertiajs/react";
import Loader from "../../Components/Loader";

export default function Programs({ program_list: programList }) {
    const { flash } = usePage().props; // Used for setting message for the toast

    // Program Store
    const setActiveTab = useProgramStore((state) => state.setActiveTab);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editProgram, setEditProgram] = useState(false);
    const [programToEdit, setProgramToEdit] = useState(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        setActiveTab(0);
    }, []);

    return (
        <div className="font-nunito-sans space-y-5">
            <RoleGuard allowedRoles={["admin", "faculty"]}>
                <div className="flex justify-end">
                    <PrimaryButton
                        doSomething={toggleModal}
                        text={"Add Program"}
                    />
                </div>
            </RoleGuard>

            {/* Display created program */}
            <div className="w-full flex flex-wrap gap-5">
                {programList.length > 0 ? (
                    programList.map((program) => {
                        return (
                            <ProgramCard
                                key={program.program_id}
                                programDetails={program}
                                setIsModalOpen={setIsModalOpen}
                                setEditProgram={setEditProgram}
                                setProgramToEdit={setProgramToEdit}
                            />
                        );
                    })
                ) : (
                    <EmptyState
                        imgSrc={"/images/illustrations/launch.svg"}
                        text={`“No programs? Time to fill this space to start learning
                adventures!”`}
                    />
                )}
            </div>

            {isModalOpen && (
                <AddProgramForm
                    editProgram={editProgram}
                    setEditProgram={setEditProgram}
                    toggleModal={toggleModal}
                    setProgramToEdit={setProgramToEdit}
                    programToEdit={programToEdit}
                />
            )}
        </div>
    );
}
