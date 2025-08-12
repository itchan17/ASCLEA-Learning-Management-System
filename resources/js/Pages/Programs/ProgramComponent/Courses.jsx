import { useState, useEffect } from "react";
import { IoImageSharp } from "react-icons/io5";
import CustomSelect from "../../../Components/CustomInputField/CustomSelect";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import EmptyState from "../../../Components/EmptyState/EmptyState";
import CourseCard from "./CourseComponent/CourseCard";
import AddCourseForm from "./CourseComponent/AddCourseForm";
import useCourseStore from "../../../Stores/Programs/courseStore";
import { BsThreeDotsVertical } from "react-icons/bs";
import { router, usePage } from "@inertiajs/react";
import AddProgramForm from "./AddProgramForm";
import { useRoute } from "ziggy-js";
import RoleGuard from "../../../Components/Auth/RoleGuard";
import { closeDropDown } from "../../../Utils/closeDropdown";
import useProgramStore from "../../../Stores/Programs/programStore";

export default function Courses() {
    const { flash, program: programDetails, courses } = usePage().props; // Get the the data of showed program from props
    const route = useRoute();

    const props = usePage().props;
    console.log(props);

    // Program Store
    const setProgramDataToUpdate = useProgramStore(
        (state) => state.setProgramDataToUpdate
    );

    // Course Store
    const courseList = useCourseStore((state) => state.courseList);
    const setActiveTab = useCourseStore((state) => state.setActiveTab);

    const [isProgramFormOpen, setIsProgramFormOpen] = useState(false);
    const [editProgram, setEditProgram] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const toggleEditProgram = () => {
        setIsProgramFormOpen(!isProgramFormOpen);
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // Reset active tab
    useEffect(() => {
        setActiveTab(0);
    }, []);

    console.log("Render Courses");

    const handleEditClick = () => {
        setProgramDataToUpdate(programDetails);
        setIsProgramFormOpen(true);
        setEditProgram(true);
        // Close the dropdown after clicked
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };

    const handleArchiveClick = () => {
        // Send a delete request to server that will archiove program through soft delete
        router.delete(route("program.archive", programDetails.program_id));
        closeDropDown(); // Close the dropdown after clicked
    };

    return (
        <div className="w-full space-y-5 font-nunito-sans text-ascend-black">
            <div className="relative bg-ascend-gray1 w-full h-50 rounded-tl-xl rounded-br-xl">
                <RoleGuard allowedRoles={["admin"]}>
                    <label htmlFor="inputBg">
                        <IoImageSharp className="text-size4 text-ascend-black absolute top-2 right-2 cursor-pointer" />
                    </label>
                    <input className="hidden" type="file" id="inputBg" />
                </RoleGuard>
            </div>
            <div className="space-y-1 pb-5 border-b border-ascend-gray1">
                <div className="flex items-start gap-2 md:gap-20">
                    <h1 className="flex-1 min-w-0 text-size7 break-words font-semibold">
                        {programDetails.program_name}
                    </h1>
                    <RoleGuard allowedRoles={["admin"]}>
                        <div className="dropdown dropdown-end cursor-pointer ">
                            <div
                                tabIndex={0}
                                role="button"
                                className="rounded-4xl p-3 hover:bg-ascend-lightblue transition-all duration-300"
                            >
                                <BsThreeDotsVertical className="text-size5 text-ascend-black" />
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
                                        Archive Program
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </RoleGuard>
                </div>

                <p className="break-words">
                    {programDetails.program_description}
                </p>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-2">
                <CustomSelect
                    selectField={
                        <select className="w-35 rounded-none appearance-none border border-ascend-black p-2 h-9 text-size1  focus:outline-ascend-blue">
                            <option value="not_started">Not started</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                    }
                />
                <RoleGuard allowedRoles={["admin"]}>
                    <PrimaryButton
                        doSomething={toggleModal}
                        text={"Add Course"}
                    />
                </RoleGuard>
            </div>

            {/* Display courses */}
            <div className="w-full flex flex-wrap gap-5">
                {courses && courses.length > 0 ? (
                    courses.map((course) => {
                        return (
                            <CourseCard
                                key={course.course_id}
                                courseDetails={course}
                            />
                        );
                    })
                ) : (
                    <EmptyState
                        imgSrc={"/images/illustrations/blank_canvas.svg"}
                        text={`“Nothing to see here… yet! Add some content to get going.”`}
                    />
                )}
            </div>

            {/* Display modal form */}
            {isOpen && <AddCourseForm toggleModal={toggleModal} />}

            {/* Open Edit program form */}
            {isProgramFormOpen && (
                <AddProgramForm
                    editProgram={editProgram}
                    setEditProgram={setEditProgram}
                    toggleModal={toggleEditProgram}
                />
            )}
        </div>
    );
}
