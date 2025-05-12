import { useState } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import ProgramEmptyState from "./ProgramComponent/ProgramEmptyState";
import AddProgramForm from "./ProgramComponent/AddProgramForm";

export default function Programs() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log("Render Programs");

    const doSomething = () => {
        console.log("CLick Button");
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <div className="font-nunito-sans">
                <div className="flex justify-end">
                    <PrimaryButton
                        doSomething={toggleModal}
                        text={"Create Program"}
                    />
                </div>
                <div className="w-full">
                    <ProgramEmptyState />
                </div>
                {isModalOpen && <AddProgramForm toggleModal={toggleModal} />}
            </div>
        </>
    );
}
