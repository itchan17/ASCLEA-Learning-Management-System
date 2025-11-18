import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function useSearchSortGrades({ programId, courseId }) {
    const [isSearchSortLoading, setIsSearchSortLoading] = useState(false);
    const [initalRender, setInitialRender] = useState(true);
    const [search, setSearch] = useState("");
    const [sortLastName, setSortLastName] = useState(null);
    const [sortFirstName, setSortFirstName] = useState(null);
    const [status, setStatus] = useState(null);

    const debouncedSearch = useMemo(() => {
        return debounce((e) => {
            setSearch(e.target.value);
        }, 300);
    }, []);

    const handleGetStudents = (query) => {
        setIsSearchSortLoading(true);
        router.get(
            route("program.course.show", {
                program: programId,
                course: courseId,
            }),
            query,
            {
                replace: true,
                showProgress: false,
                preserveScroll: true,
                preserveState: true,
                only: ["students"],
                onFinish: () => {
                    setIsSearchSortLoading(false);
                },
            }
        );
    };

    const handleSortLastName = () => {
        if (sortFirstName) {
            setSortFirstName(null);
        }

        if (!sortLastName || sortLastName === "desc") {
            setSortLastName("asc");
        } else if (sortLastName === "asc") {
            setSortLastName("desc");
        }
    };

    const handleSortFirstName = () => {
        if (sortLastName) {
            setSortLastName(null);
        }

        if (!sortFirstName || sortFirstName === "desc") {
            setSortFirstName("asc");
        } else if (sortFirstName === "asc") {
            setSortFirstName("desc");
        }
    };

    const filterStatus = (e) => {
        setStatus(e.target.value);
    };

    useEffect(() => {
        if (!initalRender) {
            const query = {};

            if (search.trim()) query.search = search.trim();
            if (sortLastName) query.lastName = sortLastName;
            if (sortFirstName) query.firstName = sortFirstName;
            if (status) query.status = status;

            handleGetStudents(query);
        } else {
            setInitialRender(false);
        }
    }, [search, sortLastName, sortFirstName, status]);

    useEffect(() => {
        // Cleanup when component unmounts
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return {
        debouncedSearch,
        isSearchSortLoading,
        sortLastName,
        handleSortLastName,
        sortFirstName,
        handleSortFirstName,
        filterStatus,
        search,
        status,
    };
}
