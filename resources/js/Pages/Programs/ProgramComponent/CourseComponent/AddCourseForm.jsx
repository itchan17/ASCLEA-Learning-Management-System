import { useState } from "react";
import AddCourse from "./AddCourse";
import PrimaryButton from "../../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../../Components/Button/SecondaryButton";
import useCourseStore from "../../../../Stores/Programs/courseStore";
import { usePage, router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function AddCourseForm({ toggleModal, isEdit = false }) {
    const { course, program } = usePage().props;

    // Course Store
    const courseDetails = useCourseStore((state) => state.course);
    const clearCourse = useCourseStore((state) => state.clearCourse);

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    // Handle submisison of the course form
    const handleSubmitCourse = () => {
        setIsLoading(true);
        setErrors(null);

        // Check form if set to edit
        if (!isEdit) {
            router.post(
                route("course.create", program.program_id),
                courseDetails,
                {
                    except: ["program"],
                    onError: (errors) => {
                        console.log(errors);
                        setErrors(errors);
                        setIsLoading(false);
                    },
                    onSuccess: () => {
                        setIsLoading(false);
                        clearCourse();
                        toggleModal();
                    },
                }
            );
        } else {
            router.put(
                route("course.update", {
                    program: program.program_id,
                    course: course.course_id,
                }),
                courseDetails,
                {
                    except: ["program"],
                    onError: (errors) => {
                        console.log(errors);
                        setErrors(errors);
                        setIsLoading(false);
                    },
                    onSuccess: () => {
                        setIsLoading(false);
                        clearCourse();
                        toggleModal();
                    },
                }
            );
        }
    };

    const handleCancelForm = () => {
        clearCourse();
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
                        doSomething={handleCancelForm}
                        text={"Cancel"}
                    />

                    <PrimaryButton
                        isDisabled={isLoading}
                        doSomething={handleSubmitCourse}
                        text={isEdit ? "Save" : "Add"}
                    />
                </div>
            </form>
        </div>
    );
}
