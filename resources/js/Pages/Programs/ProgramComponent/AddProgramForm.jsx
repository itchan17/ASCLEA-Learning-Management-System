import { useState, useEffect } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import AddCourse from "./CourseComponent/AddCourse";
import CourseItem from "./CourseComponent/CourseItem";
import useProgramStore from "../../../Stores/Programs/programStore";
import useCourseStore from "../../../Stores/Programs/courseStore";
import { router, useForm } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { displayToast } from "../../../Utils/displayToast";
import DefaultCustomToast from "../../../Components/CustomToast/DefaultCustomToast";

export default function AddProgramForm({
    toggleModal,
    editProgram,
    setEditProgram,
}) {
    const route = useRoute();

    // Program Store
    const setProgramDataToUpdate = useProgramStore(
        (state) => state.setProgramDataToUpdate
    );
    const programDataToUpdate = useProgramStore(
        (state) => state.programDataToUpdate
    );

    // Course Store
    const course = useCourseStore((state) => state.course);
    const clearCourse = useCourseStore((state) => state.clearCourse);

    // Local states
    const [addCourse, setAddCourse] = useState(false);
    const [addCourseError, setAddCourseError] = useState(null);
    const [isValidating, setIsValidating] = useState(false);

    const { data, setData, post, put, processing, errors, clearErrors, reset } =
        useForm(
            editProgram
                ? {
                      program_name: programDataToUpdate.program_name,
                      program_description:
                          programDataToUpdate.program_description || "",
                  }
                : {
                      program_name: "",
                      program_description: "",
                      course_list: [],
                  }
        );

    const saveCourse = (e) => {
        e.preventDefault();
        setAddCourseError(null);
        setIsValidating(true);

        router.post(route("validate.course"), course, {
            showProgress: false,
            onError: (error) => {
                setAddCourseError(error);
                setIsValidating(false);
            },
            onSuccess: (page) => {
                // setCourseList(course);
                setData("course_list", [...data.course_list, course]);
                clearCourse();
                setIsValidating(false);
                toggleAddCourse();
            },
        });
    };

    // Handle add program form subsmission
    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();

        // Check first if form is set for editing
        if (!editProgram) {
            // Send a post request to server to create program
            post(route("program.create", []), {
                showProgress: false,
                onSuccess: (page) => {
                    reset();
                    toggleModal();
                    displayToast(
                        <DefaultCustomToast
                            message={page.props.flash.success}
                        />,
                        "success"
                    );
                },
            });
        } else {
            // Send a put request to server to update program
            put(route("program.update", programDataToUpdate.program_id), {
                showProgress: false,
                onSuccess: (page) => {
                    reset();
                    toggleModal();
                    setEditProgram(false);
                    displayToast(
                        <DefaultCustomToast
                            message={page.props.flash.success}
                        />,
                        "success"
                    );
                },
            });
        }
    };

    const toggleAddCourse = () => {
        setAddCourse(!addCourse);
    };

    const handleCancelForm = () => {
        toggleModal();
        if (editProgram) {
            setEditProgram(false);
        }
        setProgramDataToUpdate(null);
    };

    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
            <form
                onKeyDown={(e) => {
                    // prevent enter from submiiting/closing the form
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
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
                {data.course_list && data.course_list.length > 0 && (
                    <h1 className="text-size4 font-bold">Courses</h1>
                )}

                {/* Display courses added */}
                {data.course_list && data.course_list.length > 0 && (
                    <div className="divide-y-[0.5px] divide-ascend-gray1">
                        {data.course_list.map((course, i) => (
                            <CourseItem key={i} course={course} />
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
                        <AddCourse
                            errors={addCourseError}
                            toggleAddCourse={toggleAddCourse}
                        />
                        <PrimaryButton
                            isDisabled={isValidating}
                            isLoading={isValidating}
                            doSomething={saveCourse}
                            text={"Save"}
                        />
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
                        doSomething={handleCancelForm}
                        text={"Cancel"}
                    />

                    <PrimaryButton
                        isDisabled={processing}
                        isLoading={processing}
                        doSomething={handleSubmit}
                        text={editProgram ? "Save" : "Add"}
                    />
                </div>
            </form>
        </div>
    );
}
