import { useState, useRef, useEffect, useCallback } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import PostForm from "./HomeComponents/PostForm";
import Post from "./HomeComponents/Post";
import usePostStore from "../../../../../Stores/Programs/CourseContent/postStore";
import EmptyState from "../../../../../Components/EmptyState/EmptyState";
import { router, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import useProgramStore from "../../../../../Stores/Programs/programStore";
import useCourseStore from "../../../../../Stores/Programs/courseStore";
import AddCourseForm from "../AddCourseForm";
import RoleGuard from "../../../../../Components/Auth/RoleGuard";

export default function Home() {
    const route = useRoute();
    const { programId, courseId } = usePage().props;

    // Program Store
    const programList = useProgramStore((state) => state.programList);

    // Course Store
    const setCourse = useCourseStore((state) => state.setCourseDetails);
    const archiveCourse = useCourseStore((state) => state.archiveCourse);

    // Post Store
    const postList = usePostStore((state) => state.postList);
    const clearPostDetails = usePostStore((state) => state.clearPostDetails);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [courseDetails, setCourseDetails] = useState(null);
    const [openCourseForm, setOpenCourseForm] = useState(false);

    const targetForm = useRef(null);

    // temporarily get the data of slected assessment
    useEffect(() => {
        // check if id is true
        if ((programId, courseId)) {
            // find the assessment details in asssessment list based on the id in url
            // this in temporary only as there's currently data passed from backend
            // the data will come from the backend and here's we're it will be set
            const program = programList.find(
                (program) => program.id === Number(programId)
            );

            const course = program.courseList.find(
                (course) => course.id === Number(courseId)
            );

            // set the data
            setCourseDetails(course);
        }
    }, [programList]);

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
        setCourse(courseDetails);
        setOpenCourseForm(true);

        // Close the dropdown after clicked
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };

    const handleArchiveCourse = () => {
        // Navigate first, then delete
        router.visit(route("program.view", { programId }), {
            onFinish: () => {
                archiveCourse(Number(programId), Number(courseId));
            },
        });

        // Close the dropdown after clicked
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };

    return (
        <div className="space-y-5 w-full text-ascend-black font-nunito-sans">
            <div className="space-y-1 pb-5 border-b border-ascend-gray1">
                <div className="flex items-start gap-2 md:gap-20">
                    <h1 className="flex-1 min-w-0 text-size7 break-words font-semibold">
                        {`${
                            courseDetails?.courseCode
                                ? `${courseDetails?.courseCode} - `
                                : ""
                        }${courseDetails?.courseName}`}
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

                <p className="break-words">
                    {courseDetails?.courseDescription}
                </p>
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
