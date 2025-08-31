import { create } from "zustand";

const useQuestionStore = create((set) => ({
    questionDetails: null,
    questionOptions: [],

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
}));

export default useQuestionStore;
