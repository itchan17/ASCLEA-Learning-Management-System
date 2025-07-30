import { useState } from "react";
import AddCourse from "./AddCourse";
import PrimaryButton from "../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../Components/Button/SecondaryButton";
import useCourseStore from "../../../../Stores/Programs/courseStore";
import { usePage, router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function AddCourseForm({ toggleModal, isEdit = false }) {
    const { program } = usePage().props;

    // Course Store
    const course = useCourseStore((state) => state.course);
    const handleEditCourse = useCourseStore((state) => state.handleEditCourse);

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    // Add the course
    const addCourse = () => {
        setIsLoading(true);
        setErrors(null);
        router.post(route("course.create", program.program_id), course, {
            except: ["program"],
            onError: (errors) => {
                setErrors(errors);
                setIsLoading(false);
            },
            onSuccess: () => {
                setIsLoading(false);
                toggleModal();
            },
        });
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
                <AddCourse errors={errors} />
                <div className="flex justify-end space-x-2">
                    <SecondaryButton
                        isDisabled={isLoading}
                        doSomething={toggleModal}
                        text={"Cancel"}
                    />
                    {isEdit ? (
                        <PrimaryButton doSomething={editCourse} text={"Save"} />
                    ) : (
                        <PrimaryButton
                            isDisabled={isLoading}
                            doSomething={addCourse}
                            text={"Add"}
                        />
                    )}
                </div>
            </form>
        </div>
    );
}
