import { useState, useEffect } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import AddCourse from "./CourseComponent/AddCourse";
import CourseItem from "./CourseComponent/CourseItem";
import useProgramStore from "../../../Stores/Programs/programStore";
import useCourseStore from "../../../Stores/Programs/courseStore";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

export default function AddProgramForm({
    toggleModal,
    editProgram,
    setEditProgram,
}) {
    console.log("Render Add Program Form");
    const route = useRoute();
    // Program Store
    const program = useProgramStore((state) => state.program);
    const handleProgramChange = useProgramStore(
        (state) => state.handleProgramChange
    );
    const addProgram = useProgramStore((state) => state.addProgram);
    const editProgramDetails = useProgramStore(
        (state) => state.editProgramDetails
    );

    // Course Store
    const courseList = useCourseStore((state) => state.courseList);
    const addCourseFunc = useCourseStore((state) => state.addCourse);

    const [addCourse, setAddCourse] = useState(false);

    const saveCourse = (e) => {
        e.preventDefault();
        addCourseFunc();
        toggleAddCourse();
    };

    // Add program
    const handleAdd = (e) => {
        e.preventDefault();
        // Handle post request for creating program
        router.post(
            route("program.create"),
            {
                program_name: "Licensure examination for Teachers",
                program_description:
                    "<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>",
            },
            { onSuccess: (page) => console.log(page) }
        );
        // addProgram();
        // setEditProgram(false);
        // // Close modal form
        // toggleModal();
    };

    const handleEditProgram = (e) => {
        e.preventDefault();
        editProgramDetails(program.id);

        // Close modal form
        toggleModal();
    };

    const toggleAddCourse = () => {
        setAddCourse(!addCourse);
    };

    useEffect(() => {
        console.log(courseList);
    }, [courseList]);

    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
            <form className="bg-ascend-white opacity-100 p-5 w-150 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10">
                <h1 className="text-size4 font-bold">
                    {editProgram ? "Edit" : "Add"} Program
                </h1>
                <div>
                    <label htmlFor="">
                        Program Name
                        <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        value={program.programName}
                        className="border w-full p-2 h-9 focus:outline-ascend-blue"
                        type="text"
                        onChange={(e) =>
                            handleProgramChange("programName", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label htmlFor="">Program Description</label>
                    <textarea
                        value={program.programDescription}
                        id=""
                        className="border w-full p-2 focus:outline-ascend-blue"
                        rows={5}
                        onChange={(e) =>
                            handleProgramChange(
                                "programDescription",
                                e.target.value
                            )
                        }
                    ></textarea>
                </div>
                {/* Display this header when there's a course */}
                {courseList.length > 0 && (
                    <h1 className="text-size4 font-bold">Courses</h1>
                )}

                {/* Display courses added */}
                {courseList.length > 0 && (
                    <div className="divide-y-[0.5px] divide-ascend-gray1">
                        {courseList.map((course, index) => (
                            <CourseItem
                                key={index}
                                index={index}
                                courseCode={course.courseCode}
                                courseName={course.courseName}
                                courseDay={course.courseDay}
                                fromTime={course.fromTime}
                                toTime={course.toTime}
                            />
                        ))}
                    </div>
                )}

                {/* Display header and cancel button */}
                {addCourse && (
                    <div className="flex justify-between items-center">
                        <h1 className="text-size4 font-bold">Add Course</h1>
                        <span
                            className="cursor-pointer text-ascend-red"
                            onClick={toggleAddCourse}
                        >
                            Cancel
                        </span>
                    </div>
                )}

                {addCourse && (
                    <>
                        <AddCourse toggleAddCourse={toggleAddCourse} />
                        <PrimaryButton doSomething={saveCourse} text={"Save"} />
                    </>
                )}

                {!editProgram && !addCourse && (
                    <PrimaryButton
                        text={"Add Course"}
                        doSomething={toggleAddCourse}
                    />
                )}

                <div className="flex justify-end space-x-2">
                    <SecondaryButton
                        doSomething={() => {
                            toggleModal();
                            if (editProgram) {
                                setEditProgram(false);
                            }
                        }}
                        text={"Close"}
                    />
                    {editProgram ? (
                        <PrimaryButton
                            doSomething={handleEditProgram}
                            text={"Save"}
                        />
                    ) : (
                        <PrimaryButton doSomething={handleAdd} text={"Add"} />
                    )}
                </div>
            </form>
        </div>
    );
}
