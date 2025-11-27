import { create } from "zustand";

export const usePaymentTabs = create((set) => ({
  activeTab: 0, // default to Active
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
