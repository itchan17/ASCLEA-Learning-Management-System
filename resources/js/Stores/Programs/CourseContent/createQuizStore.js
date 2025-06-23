import { create } from "zustand";

const useCreateQuizStore = create((set) => ({
    isFormOpen: false,

    quizDetails: {
        quizTitle: "",
        quizDescription: "",
    },

    questionList: [
        {
            id: 1,
            type: "multiple_choice",
            question: "Which of these is programming language?",
            choices: ["React", "HTML", "CSS", "Java"],
            answer: ["Python"],
            points: 2,
        },
        {
            id: 2,
            type: "true_or_false",
            question: "The Great Wall of China is visible from space.",
            choices: ["True", "False"],
            answer: "False",
            points: 1,
        },
        {
            id: 3,
            type: "identification",
            question: "What is the chemical symbol for water?",
            answer: "H2O",
            points: 1,
        },
    ],

    handleQuizDetailsChange: (field, value) => {
        const { quizDetails } = useCreateQuizStore.getState();

        set({
            quizDetails: {
                ...quizDetails,
                [field]: value,
            },
        });
    },
}));

export default useCreateQuizStore;
