import { create } from "zustand";

const useProgramStore = create((set) => ({
    programList: [],
    program: { programName: "", programDescription: "" },
    activeTab: 0,

    handleProgramChange: (field, value) =>
        set((state) => ({
            program: {
                ...state.program,
                [field]: value,
            },
        })),

    clearProgram: () =>
        set(() => ({
            program: { programName: "", programDescription: "" },
        })),

    addProgram: () => {
        const { program, programList, clearProgram } =
            useProgramStore.getState();

        // Log current program
        console.log(program);

        // Add to the list
        set({
            programList: [...programList, program],
        });

        // Clear the form
        clearProgram();
    },

    setActiveTab: (tab) => {
        const { activeTab } = useProgramStore.getState();

        set({ activeTab: tab });
    },
}));

export default useProgramStore;
