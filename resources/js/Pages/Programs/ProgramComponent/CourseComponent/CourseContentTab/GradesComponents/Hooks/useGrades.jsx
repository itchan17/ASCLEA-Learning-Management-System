import { useState, useMemo, useEffect } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { debounce } from "lodash";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";
import { GiRazorBlade } from "react-icons/gi";

export default function useGrades({
    programId,
    courseId,
    initialGrade,
    assignedCourseId,
}) {
    const [grade, setGrade] = useState(initialGrade);
    const [initialRender, setInitialRender] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const handleGradeChange = (value) => {
        setGrade(value);
    };
    const debounceUpdateGrade = useMemo(() => {
        return debounce((grade) => {
            handleUpdateStudentGrade(grade);
        }, 300);
    }, []);

    const handleUpdateStudentGrade = (grade) => {
        setIsChanged(true);
        setIsloading(true);
        router.post(
            route("student.grade", {
                program: programId,
                course: courseId,
                assignedCourse: assignedCourseId,
            }),
            { grade },
            {
                preserveScroll: true,
                showProgress: false,
                only: ["students"],
                onFinish: () => {
                    setIsloading(false);
                },
            }
        );
    };

    useEffect(() => {
        if (!initialRender && grade !== "") {
            debounceUpdateGrade(grade);
        } else {
            setInitialRender(false);
        }

        return () => {
            debounceUpdateGrade.cancel();
        };
    }, [grade]);

    return { handleGradeChange, isLoading, grade, isChanged };
}
