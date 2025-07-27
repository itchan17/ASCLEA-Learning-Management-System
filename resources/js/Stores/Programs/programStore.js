import { create } from "zustand";

const useProgramStore = create((set) => ({
    activeTab: 0,

    // Set the active tab inside the program content
    setActiveTab: (tab) => {
        set({ activeTab: tab });
    },
}));

export default useProgramStore;
