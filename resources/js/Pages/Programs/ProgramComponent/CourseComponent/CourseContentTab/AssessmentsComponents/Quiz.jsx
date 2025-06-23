import React from "react";
import { SiGoogleforms } from "react-icons/si";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

export default function Quiz() {
    const route = useRoute();

    const handleQuizClick = () => {
        router.visit(
            route("program.course.material.form.edit", {
                programId: 1,
                courseId: 1,
                materialId: 1,
                formId: 1,
            })
        );
    };

    return (
        <div
            onClick={handleQuizClick}
            className="flex h-15 items-center space-x-4 p-2 border border-ascend-gray1 bg-ascend-white cursor-pointer hover-change-bg-color shadow-shadow2"
        >
            <div className="w-full flex overflow-hidden font-semibold font-nunito-sans text-ascebd-black">
                <SiGoogleforms
                    className={`shrink-0 text-ascend-blue text-size5`}
                />
                <h4 className="ml-2 truncate">Quiz form</h4>
            </div>
        </div>
    );
}
