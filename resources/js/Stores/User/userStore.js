import { create } from "zustand";

const useUserStore = create((set) => ({
    user: {
        user_id: "",
        role: "",
        approved: true,
        enrollment_status: null, // New field added
    },

    setAuthUser: (authUser) => {
        set({
            user: {
                user_id: authUser.user_id,
                role: authUser.role_name,
                approved: true,
                enrollment_status: authUser.enrollment_status || null, // Set new field
            },
        });
    },
}));

export default useUserStore;
