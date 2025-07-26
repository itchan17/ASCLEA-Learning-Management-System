import { create } from "zustand";

const useAdministrationStore = create((set) => ({
    staffList: [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            middleName: "Aaron",
            role: "admin",
            email: "johndoe@email.com",
            status: "active",
            lastLogin: "2 days ago",
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Doe",
            middleName: "Aaron",
            role: "faculty",
            email: "janesmith@email.com",
            status: "inactive",
            lastLogin: "3 hours ago",
        },
        {
            id: 3,
            firstName: "Mark",
            lastName: "Doe",
            middleName: "Aaron",
            role: "faculty",
            email: "marklee@email.com",
            status: "active",
            lastLogin: "1 day ago",
        },
    ],
}));

export default useAdministrationStore;
