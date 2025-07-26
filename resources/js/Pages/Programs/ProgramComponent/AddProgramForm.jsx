import { useState, useEffect } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import AddCourse from "./CourseComponent/AddCourse";
import CourseItem from "./CourseComponent/CourseItem";
import useProgramStore from "../../../Stores/Programs/programStore";
import useCourseStore from "../../../Stores/Programs/courseStore";
import { router, useForm } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

export default function AddProgramForm({
    toggleModal,
    editProgram,
    setEditProgram,
}) {
    const route = useRoute();

    // Program Store
    // const program = useProgramStore((state) => state.program);
    // const handleProgramChange = useProgramStore(
    //     (state) => state.handleProgramChange
    // );
    // const addProgram = useProgramStore((state) => state.addProgram);
    const editProgramDetails = useProgramStore(
        (state) => state.editProgramDetails
    );
    const setProgramList = useProgramStore((state) => state.setProgramList);

    // Course Store
    const courseList = useCourseStore((state) => state.courseList);
    const addCourseFunc = useCourseStore((state) => state.addCourse);
    const clearCourseList = useCourseStore((state) => state.clearCourseList);

    const [addCourse, setAddCourse] = useState(false);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        program_name: "",
        program_description: "",
        course_list: [],
    });

    const saveCourse = (e) => {
        e.preventDefault();
        addCourseFunc();
        toggleAddCourse();
    };

    useEffect(() => {
        // Check if user added a course the set the course_list of the form
        if (Array.isArray(courseList) && courseList.length > 0) {
            setData("course_list", courseList);
        }
    }, [courseList]);

    // Handle add program form subsmission
    const handleAddProgram = (e) => {
        e.preventDefault();
        clearErrors();

        // Send a post request to server
        post(route("program.create"), {
            onSuccess: (page) => {
                setData({
                    program_name: "",
                    program_description: "",
                    course_list: [],
                });
                clearCourseList();

                // Get the data response from the flash succes
                // Add the new program to progmramList array
                if (page.props.flash.success.data) {
                    setProgramList(page.props.flash.success.data);
                }

                toggleModal();
            },
        });

        setEditProgram(false);
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

    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
            <form
                onSubmit={handleAddProgram}
                className="bg-ascend-white opacity-100 p-5 w-150 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10"
            >
                <h1 className="text-size4 font-bold">
                    {editProgram ? "Edit" : "Add"} Program
                </h1>
                <div>
                    <label htmlFor="">
                        Program Name
                        <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        value={data.program_name}
                        className={`border ${
                            errors.program_name
                                ? "border-2 border-ascend-red"
                                : ""
                        } w-full p-2 h-9 focus:outline-ascend-blue`}
                        type="text"
                        onChange={(e) =>
                            setData("program_name", e.target.value)
                        }
                    />
                    {errors.program_name && (
                        <span className="text-ascend-red">
                            {errors.program_name}
                        </span>
                    )}
                </div>

                <div>
                    <label htmlFor="">Program Description</label>
                    <textarea
                        value={data.program_description}
                        id=""
                        className="border w-full p-2 focus:outline-ascend-blue"
                        rows={5}
                        onChange={(e) =>
                            setData("program_description", e.target.value)
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
                        isDisabled={processing}
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
                        <PrimaryButton
                            isDisabled={processing}
                            btnType="submit"
                            text={"Add"}
                        />
                    )}
                </div>
            </form>
        </div>
    );
}
