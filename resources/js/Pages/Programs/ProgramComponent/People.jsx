import { useState } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import AddStudentForm from "./PeopleComponent/AddStudentForm";
import PeopleTable from "./PeopleComponent/PeopleTable";

export default function People() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    console.log("Render People");
    return (
        <div className="font-nunito-sans text-ascend-black space-y-5">
            <div className="w-full flex flex-wrap justify-between items-center gap-5">
                <h1 className="text-size6 font-bold">Learning Members</h1>
                <PrimaryButton doSomething={toggleModal} text={"Add Student"} />
            </div>

            {isOpen && <AddStudentForm toggleModal={toggleModal} />}

            <PeopleTable />
        </div>
    );
}
