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

    return { isLoading };
}
