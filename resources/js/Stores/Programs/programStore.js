import { create } from "zustand";
import useCourseStore from "./courseStore";

const useProgramStore = create((set) => ({
    programList: [],
    activeTab: 0,

    // Set the active tab inside the program content
    setActiveTab: (tab) => {
        set({ activeTab: tab });
    },

    setProgramList: (program) => {
        const { programList } = useProgramStore.getState();

        if (Array.isArray(program)) {
            set(() => ({ programList: [...program] })); // clone for safety
        } else {
            set(() => ({ programList: [...programList, program] }));
        }
    },

    editProgramDetails: (programId) => {
        const { programList, program, clearProgram } =
            useProgramStore.getState();

        const programIndex = programList.findIndex((p) => p.id === programId);
        // create a copy of the program list
        const newProgramList = programList;

        // change array item based on the index
        newProgramList[programIndex] = program;

        set(() => ({
            // update the list by spreading the new array
            programList: [...newProgramList],
        }));

        clearProgram();
    },

    deleteProgram: (programId) => {
        const { programList, program, clearProgram } =
            useProgramStore.getState();

        const newProgramList = programList.filter((p) => p.id !== programId);

        console.log(newProgramList);

        set(() => ({
            // update the list by spreading the new array
            programList: [...newProgramList],
        }));
    },

    setProgram: (programDetails) => {
        set({
            program: programDetails,
        });
    },
}));

export default useProgramStore;
