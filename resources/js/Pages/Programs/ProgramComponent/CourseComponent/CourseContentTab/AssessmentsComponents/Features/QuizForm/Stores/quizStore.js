import { create } from "zustand";

const useQuizStore = create((set) => ({
    isFormSaving: false,
    isQuizDetailsChanged: false,
    quizDetails: {
        quiz_title: "",
        quiz_description: null,
        quiz_total_points: 0,
        duration: "",
        show_answers_after: false,
        cheating_mitigation: false,
        quiz_total_points: 0,
        cv_options: [],
    },
    savedLabel: "",

    setIsFormSaving: (value) => {
        set({
            isFormSaving: value,
        });
    },

    setIsQuizDetailsChanged: (value) => {
        set({
            isQuizDetailsChanged: value,
        });
    },

    setQuizDetails: (quizDetails) => {
        set({
            quizDetails: quizDetails,
        });
    },

    setSavedLabel: (label) => {
        set({
            savedLabel: label,
        });
    },

    resetQuizStore: () => {
        set({
            isFormSaving: false,
            isQuizDetailsChanged: false,
            savedLabel: "",
        });
    },
}));

export default useQuizStore;
