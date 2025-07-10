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
import useProgramStore from "../../../Stores/Programs/programStore";
import AddProgramForm from "./AddProgramForm";
import { useRoute } from "ziggy-js";

export default function Courses() {
    const route = useRoute();

    // Program Store
    const programList = useProgramStore((state) => state.programList);
    const setProgram = useProgramStore((state) => state.setProgram);
    const deleteProgram = useProgramStore((state) => state.deleteProgram);

    // Course Store
    const courseList = useCourseStore((state) => state.courseList);
    const setActiveTab = useCourseStore((state) => state.setActiveTab);

    const [isProgramFormOpen, setIsProgramFormOpen] = useState(false);
    const [editProgram, setEditProgram] = useState(false);

    // get the id from url
    const { programId } = usePage().props;

    const [isOpen, setIsOpen] = useState(false);
    const [programDetails, setProgramDetails] = useState(null);

    const toggleEditProgram = () => {
        setIsProgramFormOpen(!isProgramFormOpen);
    };

    // temporarily get the data of slected assessment
    useEffect(() => {
        // check if id is true
        if (programId) {
            // find the assessment details in asssessment list based on the id in url
            // this in temporary only as there's currently data passed from backend
            // the data will come from the backend and here's we're it will be set
            const details = programList.find(
                (detail) => detail.id === Number(programId)
            );

            // set the data
            setProgramDetails(details);
        }
    }, [programList]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // Reset active tab
    useEffect(() => {
        setActiveTab(0);
    }, []);

    console.log("Render Courses");

    const handleEditClick = () => {
        setIsProgramFormOpen(true);
        setProgram(programDetails);
        setEditProgram(true);

        // Close the dropdown after clicked
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };

    const handleArchiveClick = () => {
        // Navigate first, then delete
        router.visit(route("programs.index"), {
            onFinish: () => {
                deleteProgram(Number(programId));
            },
        });

        // Close the dropdown after clicked
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };

    return (
        <div className="w-full space-y-5 font-nunito-sans text-ascend-black">
            <div className="relative bg-ascend-gray1 w-full h-50 rounded-tl-xl rounded-br-xl">
                <label htmlFor="inputBg">
                    <IoImageSharp className="text-size4 text-ascend-black absolute top-2 right-2 cursor-pointer" />
                </label>
                <input className="hidden" type="file" id="inputBg" />
            </div>
            <div className="space-y-1 pb-5 border-b border-ascend-gray1">
                <div className="flex items-start gap-2 md:gap-20">
                    <h1 className="flex-1 min-w-0 text-size7 break-words font-semibold">
                        {programDetails?.programName}
                    </h1>

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
                </div>

                <p className="break-words">
                    {programDetails?.programDescription}
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
                <PrimaryButton doSomething={toggleModal} text={"Add Course"} />
            </div>

            {/* Display courses */}
            <div className="w-full flex flex-wrap gap-5">
                {programDetails?.courseList?.length > 0 ? (
                    programDetails?.courseList.map((course) => {
                        return (
                            <CourseCard
                                key={course.id}
                                courseId={course.id}
                                courseCode={course.courseCode}
                                courseName={course.courseName}
                                courseDescription={course.courseDescription}
                            />
                        );
                    })
                ) : (
                    <EmptyState
                        imgSrc={"/images/illustrations/blank_canvas.svg"}
                        text={`“Nothing to see here… yet! Add some content to get going.”`}
                    />
                )}

                {/* <CourseCard
                    courseId={1}
                    courseCode={"EDUC 101"}
                    courseName={"Facilitating Learners"}
                    courseDescription={
                        "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea."
                    }
                />
                <CourseCard
                    courseId={2}
                    courseCode={"EDUC 101"}
                    courseName={"Facilitating Learners"}
                    courseDescription={
                        "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea."
                    }
                />
                <CourseCard
                    courseId={3}
                    courseCode={"EDUC 101"}
                    courseName={"Facilitating Learners"}
                    courseDescription={
                        "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea."
                    }
                /> */}
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
