import { useState, useEffect } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import AddProgramForm from "./ProgramComponent/AddProgramForm";
import useProgramStore from "../../Stores/Programs/programStore";
import ProgramCard from "./ProgramComponent/ProgramCard";
import EmptyState from "../../Components/EmptyState/EmptyState";
import RoleGuard from "../../Components/Auth/RoleGuard";
import { usePage } from "@inertiajs/react";
import Loader from "../../Components/Loader";

export default function Programs() {
    // Program Store
    const programList = useProgramStore((state) => state.programList);
    const setProgramList = useProgramStore((state) => state.setProgramList);
    const setActiveTab = useProgramStore((state) => state.setActiveTab);

    console.log(programList);
    console.log("Render Programs");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editProgram, setEditProgram] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        setActiveTab(0);
    }, []);

    useEffect(() => {
        console.log("Edit program: " + editProgram);
    }, [editProgram]);

    const { program_list } = usePage().props;
    useEffect(() => {
        if (program_list.length > 0) {
            setProgramList(program_list);
        }
        setHasLoaded(true);
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
                {!hasLoaded ? (
                    <Loader color="bg-ascend-blue" size="xl" />
                ) : programList.length > 0 ? (
                    programList.map((program, index) => {
                        return (
                            <ProgramCard
                                key={index}
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
