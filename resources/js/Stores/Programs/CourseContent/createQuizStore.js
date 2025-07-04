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
            questionType: "multipleChoice",
            question: "Which of these is programming language?",
            questionChoices: ["React", "HTML", "CSS", "Java"],
            questionAnswer: ["Python"],
            questionPoints: 2,
            required: true,
        },
        {
            questionType: "trueOrFalse",
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

    handleEditOption: (
        optionToEdit,
        setOptionToEdit,
        setOption,
        toggleAddOption,
        option
    ) => {
        const { questionDetails } = useCreateQuizStore.getState();

        if (optionToEdit) {
            // Find index of correct answer to update
            const index = questionDetails.questionAnswer.findIndex(
                (q) => q === optionToEdit.option
            );

            // Create a shallow copy of choices
            const updatedChoices = [...questionDetails.questionChoices];
            updatedChoices[optionToEdit.index] = option;

            // Also update questionAnswer if needed
            const updatedAnswers = [...questionDetails.questionAnswer];
            if (index !== -1) {
                updatedAnswers[index] = option;
            }

            // Proper Zustand set call with new object
            set((state) => ({
                questionDetails: {
                    ...state.questionDetails,
                    questionChoices: updatedChoices,
                    questionAnswer: updatedAnswers,
                },
            }));

            // reset the values
            setOptionToEdit(null);
            setOption("");
            toggleAddOption();
        }
    },

    handleDeleteOption: (choiceIndex, option) => {
        const { questionDetails } = useCreateQuizStore.getState();

        // Find index of correct answer
        const correctAnswerIndex = questionDetails.questionAnswer.findIndex(
            (q) => q === option
        );

        // Create a shallow copy of choices
        const newQuestionchoices = questionDetails.questionChoices.filter(
            (question, quesIndex) => quesIndex !== choiceIndex
        );

        // Also update questionAnswer if its the option is set as correct
        const newCorrectAsnwers = questionDetails.questionAnswer.filter(
            (question, quesIndex) => quesIndex !== correctAnswerIndex
        );

        // Proper Zustand set call with new object
        set((state) => ({
            questionDetails: {
                ...state.questionDetails,
                questionChoices: newQuestionchoices,
                questionAnswer: newCorrectAsnwers,
            },
        }));
    },
}));

export default useCreateQuizStore;
