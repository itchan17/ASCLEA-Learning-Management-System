import { useState } from "react";
import { route } from "ziggy-js";
import { router } from "@inertiajs/react";
import DefaultCustomToast from "../../../Components/CustomToast/DefaultCustomToast";
import { displayToast } from "../../../Utils/displayToast";
import useNotificationStore from "../../../Stores/Notification/notificationStore";

export default function useBackupRestore() {
    // Store
    const setIsInitialRender = useNotificationStore(
        (state) => state.setIsInitialRender
    );
    const setNotifications = useNotificationStore(
        (state) => state.setNotifications
    );
    const setIsThereNewNotif = useNotificationStore(
        (state) => state.setIsThereNewNotif
    );

    const [isLoading, setIsLoading] = useState(false);
    const [isGenerateBackupLoading, setIsGenerateBackupLoading] =
        useState(false);

    const backup = () => {
        setIsGenerateBackupLoading(true);
        router.post(
            route("backup"),
            {},
            {
                showProgress: false,
                onSuccess: (page) => {
                    console.log(page);
                    displayToast(
                        <DefaultCustomToast
                            message={page.props.flash.message}
                        />,
                        "info"
                    );
                },
                onError: (errors) => {
                    displayToast(
                        <DefaultCustomToast message={errors.error} />,
                        "error"
                    );
                },
                onFinish: () => {
                    setIsGenerateBackupLoading(false);
                },
            }
        );
    };

    const restore = (backupId, setOpenRestoreModal, setBackupId) => {
        setIsLoading(true);
        router.put(
            route("restore", { backup: backupId }),
            {},
            {
                showProgress: false,
                onSuccess: () => {
                    // Clear notification states
                    // When user bacckups it creates notification
                    // When the user immediately restore these state persist after logout causing 0 notification to show
                    // and the previous notification data to show when the user open the nootification
                    setIsInitialRender(true);
                    setNotifications([]);
                    setIsThereNewNotif(false);

                    setOpenRestoreModal(false);
                    setBackupId(null);
                },
                onError: (errors) => {
                    displayToast(
                        <DefaultCustomToast message={errors.error} />,
                        "error"
                    );
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    const deleteBackup = (backupId, setOpenAlertModal, setBackupId) => {
        setIsLoading(true);
        router.delete(route("backup.delete", { backup: backupId }), {
            showProgress: false,
            onSuccess: (page) => {
                setOpenAlertModal(false);
                displayToast(
                    <DefaultCustomToast message={page.props.flash.success} />,
                    "success"
                );
                setBackupId(null);
            },
            onError: (errors) => {
                displayToast(
                    <DefaultCustomToast message={errors.error} />,
                    "error"
                );
            },
            onFinish: () => {
                setIsLoading(false);
            },
        });
    };

    return {
        backup,
        restore,
        deleteBackup,
        isLoading,
        isGenerateBackupLoading,
    };
}
