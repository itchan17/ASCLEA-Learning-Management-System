import { create } from "zustand";
import axios from "axios";
import { route } from "ziggy-js";

const useAccountingStore = create((set) => ({
    AccountingList: [], 
    newAccounting: [],

    // Fetch Paid Students from backend
    fetchPaidStudents: async () => {
        try {
            const res = await axios.get(route("accounting.paid.students"));
            set({ AccountingList: res.data });
        } catch (error) {
            console.error("Error fetching paid students:", error);
        }
    },
}));

export default useAccountingStore;
