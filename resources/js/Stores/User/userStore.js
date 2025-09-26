import { create } from "zustand";

const useUserStore = create((set) => ({
    user: {
        user_id: "",
        role: "",
        approved: true,
    },

    setAuthUser: (authUser) => {
        set({
            user: {
                user_id: authUser.user_id,
                role: authUser.role_name,
                approved: true,
            },
        });
    },
}));

export default useUserStore;
