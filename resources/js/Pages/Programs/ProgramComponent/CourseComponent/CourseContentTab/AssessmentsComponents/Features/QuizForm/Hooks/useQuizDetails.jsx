import { useState } from "react";
import useQuizStore from "../Stores/quizStore";

export default function useQuizDetails() {
    // Quiz store
    const setIsQuizDetailsChanged = useQuizStore(
        (state) => state.setIsQuizDetailsChanged
    );
    const quizDetails = useQuizStore((state) => state.quizDetails);
    const setQuizDetails = useQuizStore((state) => state.setQuizDetails);

    // Local states
    const [timeoutId, setTimeoutId] = useState(null);

    const handleQuizDetailsChange = (field, value) => {
        if (field === "cv_options") {
            const updatedCvOptions = quizDetails.cv_options.some(
                (option) => option === value
            )
                ? quizDetails.cv_options.filter((option) => option != value) // Filter out the options from the list/uncheck the option
                : [...quizDetails.cv_options, value]; // Add the new option to list

            setQuizDetails({ ...quizDetails, [field]: updatedCvOptions });
        } else if (field === "duration") {
            setQuizDetails({
                ...quizDetails,
                [field]: value.length > 4 ? value.slice(0, 4) : value, // Limit the input to 4 char
            });
        } else if (field === "cheating_mitigation" && !value) {
            // Reset the value of cv_opions if cheating_mitigation is off
            setQuizDetails({
                ...quizDetails,
                [field]: value,
                ["cv_options"]: [],
            });
        } else if (field === "quiz_title") {
            setQuizDetails({
                ...quizDetails,
                [field]: value,
            });

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            if (value.trim() === "") {
                const newTimeout = setTimeout(() => {
                    setQuizDetails({
                        ...quizDetails,
                        [field]: "Edit Quiz",
                    });
                }, 1000);

                setTimeoutId(newTimeout);
            }
        } else {
            setQuizDetails({
                ...quizDetails,
                [field]: value,
            });
        }

        setIsQuizDetailsChanged(true);
    };

    // Create initalizeQuizDetails function
    const initializeQuizDetails = (initialQuizDetails) => {
        setQuizDetails({
            quiz_title: initialQuizDetails.quiz_title,
            quiz_description: initialQuizDetails.quiz_description,
            quiz_total_points: initialQuizDetails.quiz_total_points || 0,
            duration: initialQuizDetails.duration || 0,
            show_answers_after: initialQuizDetails.show_answers_after,
            cheating_mitigation: initialQuizDetails.cheating_mitigation,
            quiz_total_points: initialQuizDetails.quiz_total_points,
            cv_options:
                initialQuizDetails.options.length > 0
                    ? initialQuizDetails.options.map((option) => option.options) // return only the option value
                    : [],
        });
    };

    return { initializeQuizDetails, handleQuizDetailsChange };
}
