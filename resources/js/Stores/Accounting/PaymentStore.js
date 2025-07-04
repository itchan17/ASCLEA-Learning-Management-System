import { create } from "zustand";

const usePaymentStore = create((set) => ({
    PaymentList: [
        {
            id: 1,
            payment_method: "GCash",
            transaction_id: "012345678911",
            receipt_date: "2025-01-22",
            amount: "3500",
        },
        {
            id: 2,
            payment_method: "Cash",
            transaction_id: "011246835799",
            receipt_date: "2025-02-22",
            amount: "3500",
        },
        {
            id: 3,
            payment_method: "GCash",
            transaction_id: "122345678809",
            receipt_date: "2025-03-22",
            amount: "3500",
        },
        {
            id: 4,
            payment_method: "Bank Transfer",
            transaction_id: "123345678989",
            receipt_date: "2025-04-22",
            amount: "3500",
        },
        {
            id: 5,
            payment_method: "GCash",
            transaction_id: "123456789433",
            receipt_date: "2025-05-22",
            amount: "3500",
        },
    ],
    newPayment: [],
}));

export default usePaymentStore;
