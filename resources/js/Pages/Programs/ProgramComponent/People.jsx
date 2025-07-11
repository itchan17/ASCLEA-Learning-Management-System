import { useState } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import AddStudentForm from "./PeopleComponent/AddStudentForm";
import PeopleTable from "./PeopleComponent/PeopleTable";
import RoleGuard from "../../../Components/Auth/RoleGuard";

export default function People() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    console.log("Render People");
    return (
        <div className="font-nunito-sans text-ascend-black ">
            <div className="space-y-5">
                <div className="w-full flex flex-wrap justify-between items-center gap-5">
                    <h1 className="text-size6 font-bold">Learning Members</h1>
                    <RoleGuard allowedRoles={["admin"]}>
                        <PrimaryButton
                            doSomething={toggleModal}
                            text={"Add Student"}
                        />
                    </RoleGuard>
                </div>
                <PeopleTable />
            </div>
            {isOpen && <AddStudentForm toggleModal={toggleModal} />}
        </div>
    );
}
