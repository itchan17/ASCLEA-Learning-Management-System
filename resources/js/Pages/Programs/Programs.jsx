import { useState, useEffect } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import AddProgramForm from "./ProgramComponent/AddProgramForm";
import useProgramStore from "../../Stores/Programs/programStore";
import ProgramCard from "./ProgramComponent/ProgramCard";
import EmptyState from "../../Components/EmptyState/EmptyState";
import RoleGuard from "../../Components/Auth/RoleGuard";

export default function Programs({ program_list: programList }) {
    // Program Store
    const setActiveTab = useProgramStore((state) => state.setActiveTab);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editProgram, setEditProgram] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        setActiveTab(0);
    }, []);

    return (
        <div className="font-nunito-sans space-y-5">
            <RoleGuard allowedRoles={["admin"]}>
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
                />
            )}
        </div>
    );
}
