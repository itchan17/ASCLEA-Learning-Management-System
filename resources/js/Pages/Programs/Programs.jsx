import { useState } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import ProgramEmptyState from "./ProgramComponent/ProgramEmptyState";
import AddProgramForm from "./ProgramComponent/AddProgramForm";
import useProgramStore from "../../Stores/Programs/programStore";
import ProgramCard from "./ProgramComponent/ProgramCard";

export default function Programs() {
    // Program Store
    const programList = useProgramStore((state) => state.programList);

    console.log(programList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log("Render Programs");

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <div className="font-nunito-sans space-y-5">
                <div className="flex justify-end">
                    <PrimaryButton
                        doSomething={toggleModal}
                        text={"Add Program"}
                    />
                </div>

                {programList?.length > 0 ? (
                    <div className="w-full flex flex-wrap gap-5">
                        {programList.map((program, index) => {
                            return (
                                <ProgramCard
                                    key={index}
                                    programName={program.programName}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <ProgramEmptyState />       
                )}

                {isModalOpen && <AddProgramForm toggleModal={toggleModal} />}
            </div>
        </>
    );
}
