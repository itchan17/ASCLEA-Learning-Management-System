import { create } from "zustand";

const useQuizAnswerStore = create((set) => ({
    studentAnswers: false,
    isLoading: false,
    remainingTime: null,

    initializeStudentAnswers: (answers) => {
        set({ studentAnswers: answers });
    },

    // Keeps the payload updated whenever user answer a question
    updateStudentAnswer: (questionId, answer) => {
        const { studentAnswers } = useQuizAnswerStore.getState();

        const updateStudentAnswers = studentAnswers.map((ans) =>
            ans.question_id === questionId
                ? { ...ans, student_answer: answer }
                : ans
        );

        set({ studentAnswers: updateStudentAnswers });
    },

    setIsLoading: (loading) => {
        set({ isLoading: loading });
    },

    setRemainingTime: (remainingTime) => {
        set({ remainingTime });
    },
}));

export default useQuizAnswerStore;
