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
        required: false,
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

    handleQuestionDetailsChange: (field, value) => {
        const { questionDetails } = useCreateQuizStore.getState();

        if (field === "questionChoices" || field === "questionAnswer") {
            if (Array.isArray(value)) {
                console.log(value);
                set({
                    questionDetails: {
                        ...questionDetails,
                        [field]: [...value],
                    },
                });
            } else {
                set({
                    questionDetails: {
                        ...questionDetails,
                        [field]: [...questionDetails[field], value],
                    },
                });
            }
        } else {
            set({
                questionDetails: {
                    ...questionDetails,
                    [field]: value,
                },
            });
        }
    },

    handleQuizDetailsChange: (field, value) => {
        const { quizDetails } = useCreateQuizStore.getState();

        set({
            quizDetails: {
                ...quizDetails,
                [field]: value,
            },
        });
    },

    clearQuestionDetails: () => {
        set({
            questionDetails: {
                questionType: "",
                question: "",
                questionChoices: [],
                questionAnswer: [],
                questionPoints: 0,
                required: false,
            },
        });
    },

    handleAddQuestion: () => {
        const { questionList, questionDetails, clearQuestionDetails } =
            useCreateQuizStore.getState();
        set({
            questionList: [...questionList, questionDetails],
        });

        clearQuestionDetails();
    },
}));

export default useCreateQuizStore;
