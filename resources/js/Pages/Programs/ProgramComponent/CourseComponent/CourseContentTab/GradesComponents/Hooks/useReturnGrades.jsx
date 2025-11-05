import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function useReturnGrades({ programId, courseId, students }) {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedStudentGrades, setSelectedStudentGrades] = useState([]);
    const [unselectedStudentGrades, setUnselectedStudentGrades] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedStudentGrades(
                students
                    .filter((student) => student.grade)
                    .map((student) => student.grade.grade_id)
            );
        } else {
            // If select all was remove
            // Reset the states
            setSelectedStudentGrades([]);
            setUnselectedStudentGrades([]);
        }
    };

    const handleSelectStudentGrade = (gradeId) => {
        console.log("CLICK CHECK");
        // Add and remove user 1 by 1
        const updatedStudentGrades = selectedStudentGrades.some(
            (id) => id === gradeId
        ) // Check if the id is allready in the list
            ? selectedStudentGrades.filter((id) => id !== gradeId) // If true filter the list by removing the duplicated id
            : [...selectedStudentGrades, gradeId]; // If false add the id to the list

        setSelectedStudentGrades(updatedStudentGrades);

        // For unselecting
        if (selectAll) {
            // Add the unselected users
            const updatedUnselectedStudentGrades = unselectedStudentGrades.some(
                (id) => id === gradeId
            )
                ? unselectedStudentGrades.filter((id) => id !== gradeId)
                : [...unselectedStudentGrades, gradeId];

            if (updatedStudentGrades.length > 0) {
                setUnselectedStudentGrades(updatedUnselectedStudentGrades);
            } else {
                // Reset state if theres no updatedStudentGrades
                // This means user clicked select all then unchecked all the user
                setSelectAll(false);
                setUnselectedStudentGrades([]);
            }
        }
    };

    useEffect(() => {
        if (selectAll) {
            setSelectedStudentGrades(
                students
                    .filter((student) => student.grade)
                    .map((student) => student.grade.grade_id)
            );
        }
    }, [students]);

    const handlePostStudentGrades = (setOpenAlertModal) => {
        setIsLoading(true);
        router.put(
            route("return.student.grades", {
                program: programId,
                course: courseId,
            }),
            {
                selectAll,
                selectedStudentGrades,
                unselectedStudentGrades,
            },
            {
                preserveScroll: true,
                showProgress: false,
                only: ["students"],
                onSuccess: () => {
                    setSelectAll(false);
                    setSelectedStudentGrades([]);
                    setUnselectedStudentGrades([]);
                },
                onFinish: () => {
                    setIsLoading(false);
                    setOpenAlertModal(false);
                },
            }
        );
    };

    return {
        handleSelectAll,
        isLoading,
        handleSelectStudentGrade,
        selectedStudentGrades,
        handlePostStudentGrades,
        selectAll,
    };
}
