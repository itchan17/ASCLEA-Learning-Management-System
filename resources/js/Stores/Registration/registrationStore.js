import { create } from "zustand";

const useRegistrationStore = create((set) => ({
    registrationList: [],

    registration: {
        first_name: "Juan",
        last_name: "Dela Cruz",
        middle_name: "Reyes",
        birthdate: "1995-05-20",
        gender: "male",
        contact_number: "09171234567",
        email: "juan.delacruz@example.com",
        house_no: "123",
        province: "Laguna",
        city: "Calamba",
        barangay: "Pansol",
        password: "Secret123!",
        password_confirmation: "Secret123!",
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
                province: "",
                city: "",
                barangay: "",
                password: "",
                password_confirmation: "",
            },
        })),

    addRegistration: () => {
        const { registration, registrationList, clearRegistration } =
            useRegistrationStore.getState();

        set({ registrationList: [...registrationList, registration] });

        clearRegistration();
    },

    removeRegistration: (registrationIndex) => {
        const { registrationList } = useRegistrationStore.getState();

        set({
            registrationList: registrationList.filter(
                (registration, index) => index !== registrationIndex
            ),
        });
    },

    addFiles: (newFiles) =>
        set((state) => ({
            registration: {
                ...state.registration,
                attachedfiles: [
                    ...state.registration.attachedfiles,
                    ...newFiles,
                ],
            },
        })),

    removeFile: (index) =>
        set((state) => ({
            registration: {
                ...state.registration,
                attachedfiles: state.registration.attachedfiles.filter(
                    (_, i) => i !== index
                ),
            },
        })),
}));

export default useRegistrationStore;
