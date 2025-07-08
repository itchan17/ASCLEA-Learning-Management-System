import React from "react";
import { SiGoogleforms } from "react-icons/si";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { usePage } from "@inertiajs/react";

export default function Quiz({ quizDetails }) {
    const route = useRoute();
    console.log(quizDetails);

    const { programId, courseId } = usePage().props;
    const handleQuizClick = () => {
        router.visit(
            route("program.course.quiz-form.edit", {
                programId,
                courseId,
                quizFormId: quizDetails.id,
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
                <h4 className="ml-2 truncate">{quizDetails.quizTitle}</h4>
            </div>
        </div>
    );
}
