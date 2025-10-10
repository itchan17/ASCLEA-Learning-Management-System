import { useMemo, useState, useEffect } from "react";
import { debounce, identity } from "lodash";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function useSearchSortResponses({
    programId,
    courseId,
    assessmentId,
}) {
    const [search, setSearch] = useState("");
    const [sortScore, setSortScore] = useState(null);
    const [sortTime, setSortTime] = useState(null);
    const [sortSubmittedDate, setSortSubmittedDate] = useState(null);
    const [initalRender, setInitialRender] = useState(true);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const debouncedSearch = useMemo(() => {
        return debounce((e) => {
            setSearch(e.target.value);
        }, 300);
    }, []);

    const handleSortTime = () => {
        // Remove sorting of other column
        if (sortScore) {
            console.log("RESET SORT SCORE");
            setSortScore(null);
        }
        if (sortSubmittedDate) {
            console.log("RESET SORT SCORE");
            setSortSubmittedDate(null);
        }

        if (!sortTime || sortTime === "desc") {
            setSortTime("asc");
        } else if (sortTime === "asc") {
            setSortTime("desc");
        }
    };

    const handleSortScore = () => {
        // Remove sorting of other column
        if (sortTime) {
            setSortTime(null);
        }
        if (sortSubmittedDate) {
            console.log("RESET SORT SCORE");
            setSortSubmittedDate(null);
        }

        if (!sortScore || sortScore === "desc") {
            setSortScore("asc");
        } else if (sortScore === "asc") {
            setSortScore("desc");
        }
    };

    const handleSortSubmittedDate = () => {
        // Remove sorting of other column
        if (sortScore) {
            console.log("RESET SORT SCORE");
            setSortScore(null);
        }
        if (sortTime) {
            setSortTime(null);
        }

        if (!sortSubmittedDate || sortSubmittedDate === "desc") {
            setSortSubmittedDate("asc");
        } else if (sortSubmittedDate === "asc") {
            setSortSubmittedDate("desc");
        }
    };

    const handleGetResponses = (query) => {
        router.get(
            route("assessment.responses.view", {
                program: programId,
                course: courseId,
                assessment: assessmentId,
            }),
            query,
            {
                replace: true,
                showProgress: false,
                preserveScroll: true,
                preserveState: true,
                only: ["responses"],
            }
        );
    };

    const handleFilterSubmissionStatus = (e) => {
        setSubmissionStatus(e.target.value);
    };

    useEffect(() => {
        if (!initalRender) {
            const query = {};

            if (search.trim()) query.search = search.trim();
            if (sortScore) query.sortScore = sortScore;
            if (sortTime) query.sortTime = sortTime;
            if (sortSubmittedDate) query.sortSubmittedDate = sortSubmittedDate;
            if (submissionStatus) query.submissionStatus = submissionStatus;

            handleGetResponses(query);
        } else {
            setInitialRender(false);
        }
    }, [search, sortScore, sortTime, sortSubmittedDate, submissionStatus]);

    return {
        debouncedSearch,
        handleSortScore,
        sortScore,
        handleSortTime,
        sortTime,
        handleSortSubmittedDate,
        sortSubmittedDate,
        handleFilterSubmissionStatus,
    };
}
