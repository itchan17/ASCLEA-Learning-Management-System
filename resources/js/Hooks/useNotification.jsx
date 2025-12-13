import { useEffect, useState } from "react";
import axios from "axios";
import { route } from "ziggy-js";
import useNotificationStore from "../Stores/Notification/notificationStore";

export default function useNotification() {
    const [isLoading, setIsLoading] = useState(false);

    // Notification store
    const setNotifications = useNotificationStore(
        (state) => state.setNotifications
    );
    const setIsLoaded = useNotificationStore((state) => state.setIsLoaded);
    const isLoaded = useNotificationStore((state) => state.isLoaded);
    const updateNotifications = useNotificationStore(
        (state) => state.updateNotifications
    );
    const clearAllNotificatiions = useNotificationStore(
        (state) => state.clearAllNotificatiions
    );

    const getNotifications = async () => {
        if (!isLoaded) {
            setIsLoading(true);
            try {
                const res = await axios.get(route("get.notifications"));
                console.log(res.data.notifications);
                setNotifications(res.data.notifications);
                setIsLoaded(true);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    useEffect(() => {
        getNotifications();
    }, []);

    const readNotification = async (notificationId) => {
        setIsLoading(true);
        try {
            const res = await axios.put(
                route("read.notification", { notification: notificationId })
            );

            updateNotifications(res.data.notification);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const markAllAsRead = async () => {
        setIsLoading(true);
        try {
            const res = await axios.put(route("read.all.notifications"));

            // Set the red notifications
            setNotifications(res.data.redNotifications);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const clearAll = async () => {
        setIsLoading(true);
        try {
            await axios.delete(route("clear.all.notifications"));

            clearAllNotificatiions();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, readNotification, markAllAsRead, clearAll };
}
