import { useState } from "react";
import { route } from "ziggy-js";
import { router } from "@inertiajs/react";
import { displayToast } from "../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../Components/CustomToast/DefaultCustomToast";

export default function useArchive() {
    const [isRestoreLoading, setIsRestoreLoading] = useState(false);

    const handleRestoreCourse = (promgramId, courseId) => {
        setIsRestoreLoading(true);
        router.put(
            route("program.course.restore", {
                program: promgramId,
                course: courseId,
            }),
            {},
            {
                showProgress: false,
                only: ["archivedCourses", "flash"],
                onSuccess: (page) => {
                    displayToast(
                        <DefaultCustomToast
                            message={page.props.flash.success}
                        />,
                        "success"
                    );
                },
                onFinish: () => {
                    setIsRestoreLoading(false);
                },
            }
        );
    };

    const handleRestoreStaff = (staffId) => {
        setIsRestoreLoading(true);
        router.put(
            route("staff.restore", {
                id: staffId,
            }),
            {},
            {
                showProgress: false,
                only: ["archivedStaff", "flash"],
                onSuccess: (page) => {
                    displayToast(
                        <DefaultCustomToast
                            message={page.props.flash.success}
                        />,
                        "success"
                    );
                },
                onFinish: () => {
                    setIsRestoreLoading(false);
                },
            }
        );
    };
    return { isRestoreLoading, handleRestoreCourse, handleRestoreStaff };
}
