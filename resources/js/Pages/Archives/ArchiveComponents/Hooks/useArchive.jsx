import { useState } from "react";
import { route } from "ziggy-js";
import { router } from "@inertiajs/react";
import { displayToast } from "../../../../Utils/displayToast";
import DefaultCustomToast from "../../../../Components/CustomToast/DefaultCustomToast";

export default function useArchive() {
    const [isLoading, setIsLoading] = useState(false);

    // Course
    const handleRestoreCourse = (promgramId, courseId) => {
        setIsLoading(true);
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
                    setIsLoading(false);
                },
            }
        );
    };

    const handleForceDeleteCourse = (promgramId, courseId) => {
        setIsLoading(true);
        router.delete(
            route("course.force.delete", {
                program: promgramId,
                course: courseId,
            }),
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
                    setIsLoading(false);
                },
            }
        );
    };

    // Adminsitration
    const handleRestoreStaff = (staffId, setOpenAlertModal) => {
        setIsLoading(true);
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
                    setOpenAlertModal(false);
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    const handleForceDeleteStaff = (staffId, setOpenAlertModal) => {
        setIsLoading(true);
        router.delete(
            route("staff.force.delete", {
                id: staffId,
            }),
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
                    setOpenAlertModal(false);
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    // Students
    const handleRestoreStudent = (studentId, setOpenAlertModal) => {
        setIsLoading(true);
        router.put(
            route("student.restore", {
                student: studentId,
            }),
            {},
            {
                showProgress: false,
                only: ["archivedStudents", "flash"],
                onSuccess: (page) => {
                    displayToast(
                        <DefaultCustomToast
                            message={page.props.flash.success}
                        />,
                        "success"
                    );
                    setOpenAlertModal(false);
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    const handleForceDeleteStudent = (studentId, setOpenAlertModal) => {
        setIsLoading(true);
        router.delete(
            route("student.force.delete", {
                student: studentId,
            }),
            {
                showProgress: false,
                only: ["archivedStudents", "flash"],
                onSuccess: (page) => {
                    displayToast(
                        <DefaultCustomToast
                            message={page.props.flash.success}
                        />,
                        "success"
                    );
                    setOpenAlertModal(false);
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    };
    return {
        isLoading,
        handleRestoreCourse,
        handleForceDeleteCourse,
        handleRestoreStaff,
        handleForceDeleteStaff,
        handleRestoreStudent,
        handleForceDeleteStudent,
    };
}
