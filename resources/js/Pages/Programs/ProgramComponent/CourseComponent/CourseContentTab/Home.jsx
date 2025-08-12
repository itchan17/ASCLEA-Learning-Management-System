import { useState, useRef, useEffect, useCallback } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import PostForm from "./HomeComponents/PostForm";
import Post from "./HomeComponents/Post";
import usePostStore from "../../../../../Stores/Programs/CourseContent/postStore";
import EmptyState from "../../../../../Components/EmptyState/EmptyState";
import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import useProgramStore from "../../../../../Stores/Programs/programStore";
import useCourseStore from "../../../../../Stores/Programs/courseStore";
import AddCourseForm from "../AddCourseForm";
import RoleGuard from "../../../../../Components/Auth/RoleGuard";
import { formatTime } from "../../../../../Utils/formatTime";
import { closeDropDown } from "../../../../../Utils/closeDropdown";

export default function Home({}) {
    const { program, course } = usePage().props;
    console.log(course);

    // Course Store
    const setCourse = useCourseStore((state) => state.setCourseDetails);

    // Post Store
    const postList = usePostStore((state) => state.postList);
    const clearPostDetails = usePostStore((state) => state.clearPostDetails);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [openCourseForm, setOpenCourseForm] = useState(false);

    const targetForm = useRef(null);

    // Scroll into the form once opened
    useEffect(() => {
        if (isFormOpen) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isFormOpen]);

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
        clearPostDetails();
    };

    const handleEditClick = () => {
        console.log(course);
        setCourse(course);
        setOpenCourseForm(true);

        // Close the dropdown after clicked
        closeDropDown();
    };

    const handleArchiveCourse = () => {
        // Navigate first, then delete
        router.delete(
            route("course.archive", {
                program: program.program_id,
                course: course.course_id,
            })
        );

        // Close the dropdown after clicked
        closeDropDown();
    };

    return (
        <div className="space-y-5 w-full text-ascend-black font-nunito-sans">
            <div className="space-y-1 pb-5 border-b border-ascend-gray1">
                <div className="flex items-start gap-2 md:gap-20">
                    <h1 className="flex-1 min-w-0 text-size7 break-words font-semibold">
                        {`${
                            course?.course_code
                                ? `${course?.course_code} - `
                                : ""
                        }${course?.course_name}`}
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
                                className="dropdown-content menu text-size2 bg-ascend-white min-w-36 mt-1 px-0 border border-ascend-gray1 shadow-lg !transition-none text-ascend-black"
                            >
                                <li onClick={handleEditClick}>
                                    <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                        Edit course
                                    </a>
                                </li>
                                <li onClick={handleArchiveCourse}>
                                    <a className="w-full text-left font-bold hover:bg-ascend-lightblue hover:text-ascend-blue transition duration-300">
                                        Archive course
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </RoleGuard>
                </div>
                <span className="text-size4 font-semibold">
                    {course.course_day &&
                        `${
                            course.course_day.charAt(0).toUpperCase() +
                            course.course_day.slice(1)
                        }: ${formatTime(course.start_time)} to
                    ${formatTime(course.end_time)}`}
                </span>
                <p className="break-words">{course?.course_description}</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <h1 className="text-size6 font-bold">Home</h1>

                <RoleGuard allowedRoles={["admin", "faculty"]}>
                    <PrimaryButton
                        isDisabled={isFormOpen}
                        doSomething={toggleForm}
                        text="Write a Post"
                    />
                </RoleGuard>
            </div>

            {isFormOpen && (
                <div ref={targetForm}>
                    <PostForm toggleForm={toggleForm} />
                </div>
            )}
            {postList?.length > 0 ? (
                postList.map((post, index) => (
                    <Post key={index} postContent={post} />
                ))
            ) : (
                <EmptyState
                    imgSrc={"/images/illustrations/empty.svg"}
                    text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
                />
            )}

            {/* Display EditCourse Form */}
            {openCourseForm && (
                <AddCourseForm
                    toggleModal={() => setOpenCourseForm(!openCourseForm)}
                    isEdit={openCourseForm}
                />
            )}
        </div>
    );
}
