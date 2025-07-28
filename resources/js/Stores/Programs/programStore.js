import { create } from "zustand";

const useProgramStore = create((set) => ({
    activeTab: 0,
    programDataToUpdate: null,

    // Set the active tab inside the program content
    setActiveTab: (tab) => {
        set({ activeTab: tab });
    },

    // Set the data of program thats going to update to be used to display in program form
    setProgramDataToUpdate: (programData) => {
        set({ programDataToUpdate: programData });
    },
}));

export default useProgramStore;
