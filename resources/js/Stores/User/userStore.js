import { create } from "zustand";

const useUserStore = create((set) => ({
    user: {
        user_id: "",
        role: "",
        approved: true,
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        contact_number: "",
        birthdate: "",
        gender: "",
        house_no: "",
        province: "",
        city: "",
        barangay: "",
    },

    setAuthUser: (authUser) => {
        set({
            user: {
                user_id: authUser.user_id,
                role: authUser.role.role_name,
                approved: true,
                first_name: authUser.first_name,
                last_name: authUser.last_name,
                middle_name: authUser.middle_name,
                email: authUser.email,
                contact_number: authUser.contact_number,
                birthdate: authUser.birthdate,
                gender: authUser.gender,
                house_no: authUser.house_no,
                province: authUser.province,
                city: authUser.city,
                barangay: authUser.barangay,
            },
        });
    },
}));

export default useUserStore;
