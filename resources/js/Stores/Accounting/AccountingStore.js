import { create } from "zustand";

const useAccountingStore = create((set) => ({
    AccountingList: [
        {
            id: 1,
            name: "Mika Tan",
            program: "Licensure Examination for Teachers",
            email: "mikatan@email.com",
            date_applied: "April 15, 2025",
            address: "123 Main St, Barangay Central, Quezon City, Metro Manila",
        },
        {
            id: 2,
            name: "Ella Choi",
            program: "Certificate in Teaching Program",
            email: "ellachoi@email.com",
            date_applied: "April 15, 2025",
            address: "456 Elm St, Barangay 123, Manila, Metro Manila",
        },
        {
            id: 3,
            name: "Kyle Cruz",
            program: "Licensure Examination for Teachers",
            email: "kylecruz@email.com",
            date_applied: "April 15, 2025",
            address: "789 Oak St, Barangay San Antonio, Pasig City, Metro Manila",
        },
        {
            id: 4,
            name: "Dani Torres",
            program: "Certificate in Teaching Program",
            email: "Dani Torres@email.com",
            date_applied: "April 15, 2025",
            address: "101 Pine St, Barangay Fort Bonifacio, Taguig City, Metro Manila",
        },
        {
            id: 5,
            name: "Kai Lim",
            program: "Licensure Examination for Teachers",
            email: "kailim@email.com",
            date_applied: "April 15, 2025",
            address: "102 Maple St, Barangay Poblacion, Makati City, Metro Manila",
        },
        {
            id: 6,
            name: "Tony Smith",
            program: "Certificate in Teaching Program",
            email: "tonysmith@email.com",
            date_applied: "April 15, 2025",
            address: "103 Cedar St, Barangay 178, Caloocan City, Metro Manila",
        },
        {
            id: 7,
            name: "Luke Choi",
            program: "Certificate in Teaching Program",
            email: "lukechoi@email.com",
            date_applied: "April 15, 2025",
            address: "104 Birch St, Barangay Malinta, Valenzuela City, Metro Manila",
        },
    ],
    newAccounting: [],
}));

export default useAccountingStore;
