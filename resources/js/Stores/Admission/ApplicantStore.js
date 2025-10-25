import { create } from "zustand";

const usePendingStore = create((set) => ({
    pendingList: [
        {
            id: 1,
            name: "John Doe",
            program: "Licensure Examination for Teachers",
            email: "johndoe@email.com",
            date_applied: "April 15, 2025",
            address: "123 Main St, Barangay Central, Quezon City, Metro Manila",
        },
        {
            id: 2,
            name: "Bea Soriano",
            program: "Certificate in Teaching Program",
            email: "beasoriano@email.com",
            date_applied: "April 15, 2025",
            address: "456 Elm St, Barangay 123, Manila, Metro Manila",
        },
        {
            id: 3,
            name: "Mark Smith",
            program: "Licensure Examination for Teachers",
            email: "marksmith@email.com",
            date_applied: "April 15, 2025",
            address: "789 Oak St, Barangay San Antonio, Pasig City, Metro Manila",
        },
        {
            id: 4,
            name: "Jane Doe",
            program: "Certificate in Teaching Program",
            email: "janedoe@email.com",
            date_applied: "April 15, 2025",
            address: "101 Pine St, Barangay Fort Bonifacio, Taguig City, Metro Manila",
        },
        {
            id: 5,
            name: "John Smith",
            program: "Licensure Examination for Teachers",
            email: "johnsmith@email.com",
            date_applied: "April 15, 2025",
            address: "102 Maple St, Barangay Poblacion, Makati City, Metro Manila",
        },
        {
            id: 6,
            name: "Alice Johnson",
            program: "Certificate in Teaching Program",
            email: "alicejohnson@email.com",
            date_applied: "April 15, 2025",
            address: "103 Cedar St, Barangay 178, Caloocan City, Metro Manila",
        },
        {
            id: 7,
            name: "Bob Brown",
            program: "Certificate in Teaching Program",
            email: "bobbrown@email.com",
            date_applied: "April 15, 2025",
            address: "104 Birch St, Barangay Malinta, Valenzuela City, Metro Manila",
        },
    ],
    newPending: [],
}));

export default usePendingStore;
