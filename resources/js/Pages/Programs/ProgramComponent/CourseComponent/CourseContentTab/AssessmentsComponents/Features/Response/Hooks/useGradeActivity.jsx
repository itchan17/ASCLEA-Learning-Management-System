import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function useGradeActivity({
    courseId,
    assessmentId,
    assessemntSubmissionId,
    initialGrade,
}) {
    const [grade, setGrade] = useState(initialGrade);
    const [initialRender, setInitialRender] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const gradeActivity = (e) => {
        setGrade(e.target.value);
    };

    const debounceUpdateGrade = useMemo(() => {
        return debounce((grade) => {
            handleUpdateGrade(grade);
        }, 300);
    }, []);

    const handleUpdateGrade = (grade) => {
        setIsChanged(true);
        setIsloading(true);
        router.put(
            route("grade.activity", {
                course: courseId,
                assessment: assessmentId,
                assessmentSubmission: assessemntSubmissionId,
            }),
            { grade },
            {
                preserveScroll: true,
                showProgress: false,
                only: ["responses"],
                onFinish: () => {
                    setIsloading(false);
                },
            }
        );
    };

    useEffect(() => {
        if (!initialRender) {
            if (grade !== "") {
                debounceUpdateGrade(grade);
            }
        } else {
            setInitialRender(false);
        }

        return () => {
            debounceUpdateGrade.cancel();
        };
    }, [grade]);

    return { grade, gradeActivity, isLoading, isChanged };
}
