import { create } from "zustand";

const useRegistrationStore = create((set) => ({
    registrationList: [],
    registration: {
        lastname: "",
        firstname: "",
        middlename: "",
        birthday: "",
        sex: "",    
        contactnumber: "",
        emailaddress: "",
        address: "",
        region: "",
        province: "",
        city: "",
        barangay: "", 
        zipcode: "",
        school: "",
        course: "",
        yeargrad: "",
        occupation: "",
        company: "",
        fgcivilstatus: "",
        fgname: "",
        fgaddress: "",
        fgregion: "",
        fgprovince: "",
        fgcity: "",
        fgbarangay: "",
        fgcontactnum: "",
        fgzipcode: "",
        selectedprog: "",
        attachedfiles: [],
        checked1: false,
        checked2: false,
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
            lastname: "",
            firstname: "",
            middlename: "",
            birthday: "",
            sex: "",    
            contactnumber: "",
            emailaddress: "",
            address: "",
            region: "",
            province: "",
            city: "",
            barangay: "", 
            zipcode: "",
            school: "",
            course: "",
            yeargrad: "",
            occupation: "",
            company: "",
            fgcivilstatus: "",
            fgname: "",
            fgaddress: "",
            fgregion: "",
            fgprovince: "",
            fgcity: "",
            fgbarangay: "",
            fgcontactnum: "",
            fgzipcode: "",
            selectedprog: "",
            attachedfiles: [],
            checked1: false,
            checked2: false,
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
        attachedfiles: [...state.registration.attachedfiles, ...newFiles],
      },
    })),

  removeFile: (index) =>
    set((state) => ({
      registration: {
        ...state.registration,
        attachedfiles: state.registration.attachedfiles.filter((_, i) => i !== index),
      },
    })),

}));

export default useRegistrationStore;