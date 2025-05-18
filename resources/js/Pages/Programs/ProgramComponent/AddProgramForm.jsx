import { useState } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import AddCourse from "./CourseComponent/AddCourse";
import CourseItem from "./CourseComponent/CourseItem";
import useProgramStore from "../../../Stores/Programs/programStore";
import useCourseStore from "../../../Stores/Programs/courseStore";

export default function AddProgramForm({ toggleModal }) {
    console.log("Render Add Program Form");

    // Program Store
    const program = useProgramStore((state) => state.program);
    const handleProgramChange = useProgramStore(
        (state) => state.handleProgramChange
    );
    const addProgram = useProgramStore((state) => state.addProgram);

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
        addProgram();

        // Close modal form
        toggleModal();
    };

    const toggleAddCourse = () => {
        setAddCourse(!addCourse);
    };

    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
            <form
                onSubmit={handleAdd}
                className="bg-ascend-white opacity-100 p-5 w-150 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10"
            >
                <h1 className="text-size4 font-bold">Add Program</h1>
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

                {!addCourse && (
                    <PrimaryButton
                        text={"Add Course"}
                        doSomething={toggleAddCourse}
                    />
                )}

                <div className="flex justify-end space-x-2">
                    <SecondaryButton doSomething={toggleModal} text={"Close"} />
                    <PrimaryButton btnType={"submit"} text={"Add"} />
                </div>
            </form>
        </div>
    );
}
