import { useState, useMemo, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import EmptyState from "../../../Components/EmptyState/EmptyState";
import Pagination from "@/Components/Pagination";
import { IoSearch } from "react-icons/io5";
import { debounce } from "lodash";

export default function EnrolledStudentsTable({ active }) {
    const route = useRoute();
    const { enrolledStudents } = usePage().props;
    const [search, setSearch] = useState("");

    //=========================== Handle Row Click ===========================//
    const handleRowClick = (studentId) => {
        router.visit(route("enrolled.student.view", { student: studentId }));
    };

    //=========================== Update input immediately ===========================//
    const handleInputChange = (e) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
    };

    //=========================== Debounced router call ===========================//
    const debouncedSearch = useMemo(() => debounce((value) => {
        router.get(route("enrolled.students"), { search: value, page: 1 }, {
            preserveState: true,
            only: ["enrolledStudents"]
        });
    }, 300), []);

    useEffect(() => {
        return () => debouncedSearch.cancel(); // cleanup on unmount
    }, []);

    //=========================== Reset page/search when tab becomes active ===========================//
    useEffect(() => {
        if (active) {
            setSearch("");
            router.get(route("enrolled.students"), { page: 1 }, {
                preserveState: false,
                showProgress: false,
                only: ["enrolledStudents"]
            });
        }
    }, [active]);

    return (
        <div>
            {/*=========================== Search Input ===========================*/}
            <div className="flex justify-end mb-3">
                <div className="relative">
                    <input
                        className="w-full sm:w-60 border h-10 pl-10 pr-3 border-ascend-black focus:outline-ascend-blue"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={handleInputChange}
                    />
                    <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
                </div>
            </div>

            {/*=========================== Students Table ===========================*/}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="border-b-2 border-ascend-gray3">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date Enrolled</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledStudents?.data?.length > 0 ? (
                            enrolledStudents.data.map((student) => {
                                const status = student.enrollment_status?.toLowerCase();
                                const statusColor =
                                    status === "enrolled"
                                        ? "text-ascend-blue"
                                        : status === "dropout"
                                        ? "text-ascend-red"
                                        : status === "withdrawn"
                                        ? "text-ascend-yellow"
                                        : "text-ascend-gray2";

                                return (
                                    <tr
                                        key={student.student_id}
                                        onClick={() => handleRowClick(student.student_id)}
                                        className="hover:bg-ascend-lightblue cursor-pointer border-b border-ascend-gray1"
                                    >
                                        <td className="py-5">
                                            {student.user.first_name}{" "}
                                            {student.user.middle_name ? student.user.middle_name + " " : ""}
                                            {student.user.last_name}
                                        </td>
                                        <td className="py-5">{student.user.email}</td>
                                        <td className="py-5">
                                            {new Date(student.created_at).toLocaleDateString()}
                                        </td>
                                        <td className={`py-5 capitalize ${statusColor}`}>
                                            {student.enrollment_status}
                                        </td>
                                        <td className="py-5">
                                            <span className="text-ascend-blue underline">
                                                View More
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5">
                                    <EmptyState
                                        paddingY="py-0"
                                        imgSrc="/images/illustrations/Thinking.svg"
                                        text={`Nothing to see here… yet!`}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/*=========================== Pagination ===========================*/}
            {enrolledStudents?.links?.length > 0 && (
                <div className="flex justify-end p-3">
                    <Pagination
                        links={enrolledStudents.links}
                        currentPage={enrolledStudents.current_page}
                        lastPage={enrolledStudents.last_page}
                        only={["enrolledStudents"]}
                    />
                </div>
            )}
        </div>
    );
}
