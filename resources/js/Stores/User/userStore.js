import { create } from "zustand";

const useUserStore = create((set) => ({
    user: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        role: "admin",
    },
}));

export default useUserStore;
