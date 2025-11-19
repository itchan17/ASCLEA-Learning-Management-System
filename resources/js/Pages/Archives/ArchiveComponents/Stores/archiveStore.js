import { create } from "zustand";

const useArchiveStore = create((set) => ({
    activeTab: 0,

    setActiveTab: (index) => {
        set({ activeTab: index });
    },
}));

export default useArchiveStore;
