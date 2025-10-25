import { create } from "zustand";

const useRegistrationStore = create((set) => ({
    registrationList: [],

    registration: {
        first_name: "",
        last_name: "",
        middle_name: "",
        birthdate: "",
        gender: "",
        contact_number: "",
        email: "",
        house_no: "",
        region: "",   // Added region
        province: "",
        city: "",
        barangay: "",
        password: "", //Secret123!
        password_confirmation: "", //Secret123!
    },

    handleRegistrationChange: (field, value) =>
        set((state) => ({
            registration: {
                ...state.registration,
                [field]: value,
            },
        })),

    clearRegistration: () =>
        set(() => ({
            registration: {
                first_name: "",
                last_name: "",
                middle_name: "",
                birthdate: "",
                gender: "",
                contact_number: "",
                email: "",
                house_no: "",
                region: "",
                province: "",
                city: "",
                barangay: "",
                password: "",
                password_confirmation: "",
            },
        })),
}));

export default useRegistrationStore;
