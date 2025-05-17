import { useState } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import EmptyState from "../../../Components/EmptyState/EmptyState";
import AddStudentForm from "./AddStudentForm";

export default function People() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="font-nunito-sans">
            <div className="w-full flex flex-wrap justify-between items-center gap-5">
                <h1 className="text-size6 font-bold">Learning Members</h1>
                <PrimaryButton doSomething={toggleModal} text={"Add People"} />
            </div>

            {isOpen && <AddStudentForm />}
            <EmptyState
                imgSrc={"/images/illustrations/alone.svg"}
                text={`“It’s a bit lonely here... Add some people and let the learning begin!”`}
            />
        </div>
    );
}
