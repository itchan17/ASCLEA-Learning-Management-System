import { create } from "zustand";

const useQuestionStore = create((set) => ({
    questionDetails: null,
    questionOptions: [],
    questionList: [],
    onEdit: false,

    setQuestionDetails: (updater) => {
        const { questionDetails } = useQuestionStore.getState();

        set({
            questionDetails:
                typeof updater === "function"
                    ? updater(questionDetails)
                    : updater,
        });
    },

    setQuestionOptions: (updater) => {
        const { questionOptions } = useQuestionStore.getState();

        set({
            questionOptions:
                typeof updater === "function"
                    ? updater(questionOptions)
                    : updater,
        });
    },

    setQuestionList: (updater) => {
        const { questionList } = useQuestionStore.getState();

        set({
            questionList:
                typeof updater === "function" ? updater(questionList) : updater,
        });
    },

    setOnEdit: (value) => {
        set({
            onEdit: value,
        });
    },

    resetQuestionStore: () => {
        set({
            questionDetails: null,
            questionOptions: [],
            questionList: [],
            onEdit: false,
        });
    },
}));

export default useQuestionStore;
