import { create } from "zustand";

const useUserStore = create((set) => ({
    user: {
        id: 1,
        role: "student",
        verified: true,
        firstName: "John",
        lastName: "Doe",
        middleName: "Aaron",
        program: "Licensure Examination for Teachers",
        email: "johndoe@email.com",
        status: "Enrolled",
        phone: "09123456789",
        birthday: "1995-01-01",
        gender: "Male",
        houseNoSt: "123 Main St",
        province: "Metro Manila",
        city: "Quezon City",
        barangay: "Barangay Central",
    },
}));

export default useUserStore;
