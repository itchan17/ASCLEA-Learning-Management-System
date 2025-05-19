import React from "react";
import AddCourse from "./AddCourse";
import PrimaryButton from "../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../Components/Button/SecondaryButton";
import useCourseStore from "../../../../Stores/Programs/courseStore";

export default function AddCourseForm({ toggleModal }) {
    // Course Store
    const addCourseFunc = useCourseStore((state) => state.addCourse);

    // Add the course
    const addCourse = (e) => {
        e.preventDefault();
        addCourseFunc();
        toggleModal();
    };

    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
            <form
                onSubmit={addCourse}
                className="bg-ascend-white opacity-100 p-5 w-150 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10"
            >
                <h1 className="text-size4 font-bold">Add Course</h1>
                <AddCourse />
                <div className="flex justify-end space-x-2">
                    <SecondaryButton
                        doSomething={toggleModal}
                        text={"Cancel"}
                    />
                    <PrimaryButton
                        doSomething={addCourse}
                        btnType={"submit"}
                        text={"Add"}
                    />
                </div>
            </form>
        </div>
    );
}
