import { create } from "zustand";

const useNotificationStore = create((set) => ({
    notifications: [],
    isThereNewNotif: false,
    isLoaded: false,

    setNotifications: (notifications) => {
        set({
            notifications,
        });
    },

    addNewNotification: (newNotification) => {
        const { notifications } = useNotificationStore.getState();

        set({
            notifications: [newNotification, ...notifications],
            isThereNewNotif: true,
        });
    },

    setIsThereNewNotif: (val) => {
        set({
            isThereNewNotif: val,
        });
    },

    setIsLoaded: (val) => {
        set({
            isLoaded: val,
        });
    },
}));

export default useNotificationStore;
