import { create } from "zustand";

const useCreateQuizStore = create((set) => ({
    isFormOpen: false,

    quizDetails: {
        quizTitle: "",
        quizDescription: "",
    },
    questionDetails: {
        questionType: "",
        question: "",
        questionChoices: [],
        questionAnswer: [],
        questionPoints: 0,
        required: true,
    },

    handleQuestionDetailsChange: (field, value) => {
        const { questionDetails } = useCreateQuizStore.getState();

        if (field === "questionChoices" || field === "questionAnswer") {
            set({
                questionDetails: {
                    ...questionDetails,
                    [field]: [...questionDetails[field], value],
                },
            });
        } else {
            set({
                questionDetails: {
                    ...questionDetails,
                    [field]: value,
                },
            });
        }
    },

    questionList: [
        {
            questionType: "multiple_choice",
            question: "Which of these is programming language?",
            questionChoices: ["React", "HTML", "CSS", "Java"],
            questionAnswer: ["Python"],
            questionPoints: 2,
            required: true,
        },
        {
            questionType: "true_or_false",
            question: "The Great Wall of China is visible from space.",
            questionChoices: ["True", "False"],
            questionAnswer: "False",
            questionPoints: 1,
            required: true,
        },
        {
            questionType: "identification",
            question: "What is the chemical symbol for water?",
            questionAnswer: "H2O",
            questionPoints: 1,
            required: true,
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

    handleAddQuestion: () => {
        const { questionList, questionDetails } = useCreateQuizStore.getState();
        set({
            questionList: [...questionList, questionDetails],
        });
    },
}));

export default useCreateQuizStore;
