import React from "react";
import AddCourse from "./AddCourse";
import PrimaryButton from "../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../Components/Button/SecondaryButton";
import useCourseStore from "../../../../Stores/Programs/courseStore";
import { usePage } from "@inertiajs/react";

export default function AddCourseForm({ toggleModal, isEdit = false }) {
    // Course Store
    const addCourseFunc = useCourseStore((state) => state.addCourse);
    const handleEditCourse = useCourseStore((state) => state.handleEditCourse);

    const { programId, courseId } = usePage().props;

    // Add the course
    const addCourse = () => {
        addCourseFunc(Number(programId));
        toggleModal();
    };

    // Edit course
    const editCourse = () => {
        handleEditCourse(Number(programId), Number(courseId));
        toggleModal();
    };

    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
            <form className="bg-ascend-white opacity-100 p-5 w-150 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10">
                <h1 className="text-size4 font-bold">
                    {isEdit ? "Edit Course" : "Add Course"}
                </h1>
                <AddCourse />
                <div className="flex justify-end space-x-2">
                    <SecondaryButton
                        doSomething={toggleModal}
                        text={"Cancel"}
                    />
                    {isEdit ? (
                        <PrimaryButton doSomething={editCourse} text={"Save"} />
                    ) : (
                        <PrimaryButton doSomething={addCourse} text={"Add"} />
                    )}
                </div>
            </form>
        </div>
    );
}
