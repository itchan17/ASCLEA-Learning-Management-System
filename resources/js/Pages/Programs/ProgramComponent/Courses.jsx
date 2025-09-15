import { useState, useEffect } from "react";
import { IoImageSharp } from "react-icons/io5";
import CustomSelect from "../../../Components/CustomInputField/CustomSelect";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import EmptyState from "../../../Components/EmptyState/EmptyState";
import CourseCard from "./CourseComponent/CourseCard";
import AddCourseForm from "./CourseComponent/AddCourseForm";
import useCourseStore from "../../../Stores/Programs/courseStore";
import { BsThreeDotsVertical } from "react-icons/bs";
import { router, usePage, useForm } from "@inertiajs/react";
import AddProgramForm from "./AddProgramForm";
import { useRoute } from "ziggy-js";
import RoleGuard from "../../../Components/Auth/RoleGuard";
import { closeDropDown } from "../../../Utils/closeDropdown";
import useProgramStore from "../../../Stores/Programs/programStore";
import Loader from "../../../Components/Loader";
import { ToastContainer } from "react-toastify";
import DefaultCustomToast from "../../../Components/CustomToast/DefaultCustomToast";
import { displayToast } from "../../../Utils/displayToast";
import AlertModal from "../../../Components/AlertModal";

export default function Courses() {
    const { auth, program: programDetails, courses } = usePage().props; // Get the the data of showed program from props
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
    const [isLoading, setIsLoading] = useState(false);
    const [updateBgError, setUpdateBgError] = useState(null);

    // States for alert modal
    const [isArchiveLoading, setIsArchiveLoading] = useState(false);
    const [openAlerModal, setOpenAlertModal] = useState(false);

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

    const archiveProgram = () => {
        // Send a delete request to server that will archiove program through soft delete
        setIsArchiveLoading(true);
        router.delete(route("program.archive", programDetails.program_id), {
            showProgress: false,
            onSuccess: (page) => {
                displayToast(
                    <DefaultCustomToast message={page.props.flash.success} />,
                    "success"
                );
            },
            onFinish: () => {
                setIsArchiveLoading(false);
                setOpenAlertModal(false);
            },
        });
    };

    const handleArchiveClick = () => {
        setOpenAlertModal(true);
        closeDropDown(); // Close the dropdown after clicked
    };

    const handleBackgroundChange = (e) => {
        if (e.target.files[0]) {
            setIsLoading(true);
            router.post(
                route("program.background.update", programDetails.program_id),
                { _method: "put", background_image: e.target.files[0] },
                {
                    showProgress: false,
                    onError: (error) => {
                        setUpdateBgError(error);
                        setIsLoading(false);
                    },
                    onFinish: () => setIsLoading(false),
                }
            );
        }
    };

    return (
        <div className="w-full space-y-5 font-nunito-sans text-ascend-black">
            {/* Display alert modal */}
            {openAlerModal && (
                <AlertModal
                    title={"Archive Confirmation"}
                    description={
                        "This program can only be restored after restoring its associated courses. Are you sure you want to archive it?"
                    }
                    closeModal={() => setOpenAlertModal(false)}
                    onConfirm={archiveProgram}
                    isLoading={isArchiveLoading}
                />
            )}
            <div
                className={`relative w-full group h-70 rounded-tl-xl rounded-br-xl bg-cover bg-center ${
                    !programDetails.background_image && "bg-ascend-gray1"
                }`}
                style={
                    programDetails.background_image && {
                        backgroundImage: `url('/storage/${programDetails.background_image}')`,
                    }
                }
            >
                {" "}
                {console.log(programDetails.background_image)}
                {/* Loading indicator for updating background */}
                {isLoading && (
                    <>
                        <div className="absolute z-20 h-full w-full  bg-ascend-lightblue opacity-40"></div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                            <Loader color="bg-ascend-blue" size="lg" />
                        </div>
                    </>
                )}
                <RoleGuard allowedRoles={["admin"]}>
                    <label
                        htmlFor="inputBg"
                        className={`absolute z-10 top-2 right-2 flex opacity-0 ${
                            isLoading ? "" : "group-hover:opacity-100"
                        } transition-all duration-300 items-center gap-2 bg-ascend-blue text-ascend-white px-2 py-1 cursor-pointer`}
                    >
                        <span>Change background</span>
                        <IoImageSharp className="text-size4" />
                        <input
                            onChange={(e) => handleBackgroundChange(e)}
                            className="hidden"
                            type="file"
                            id="inputBg"
                            accept="image/*"
                        />
                    </label>
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
                        text={
                            auth.user.role_name == "admin"
                                ? `Nothing to see here… yet! Add some content to get going.`
                                : "No courses found at the moment. Please check back soon!"
                        }
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
