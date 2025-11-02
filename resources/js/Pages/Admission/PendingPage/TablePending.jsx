import React from "react";
import EmptyState from "../../../Components/EmptyState/EmptyState";
import { IoSearch } from "react-icons/io5";
import usePendingStore from "../../../Stores/Admission/ApplicantStore";
import { BiFilter } from "react-icons/bi";
import { router, Link } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

const TablePending = ({ pendingStudents }) => {
    const hasPending = pendingStudents && pendingStudents.length > 0;

    return (
        <>
            <div className="flex justify-end items-center mb-3">
                <div className="relative">
                    <input
                        className="w-full sm:w-50 border h-9 pl-10 p-2 border-ascend-black focus:outline-ascend-blue"
                        type="text"
                        placeholder="Search name"
                    />
                    <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="border-b-2 border-ascend-gray3">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date Applied</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {hasPending ? (
                            pendingStudents.map((student) => (
                                <tr
                                    key={student.student_id}
                                    className="hover:bg-ascend-lightblue cursor-pointer border-b border-ascend-gray1"
                                >
                                    <td className="py-5">
                                        {student.user.first_name} {student.user.last_name}
                                    </td>
                                    <td className="py-5">{student.user.email}</td>
                                    <td className="py-5">
                                        {new Date(student.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="py-5">
                                        <Link 
                                            href={`/admission/pending/${student.student_id}`}
                                            className="text-ascend-blue underline"
                                        >
                                            View More
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">
                                    <EmptyState
                                        paddingY="py-0"
                                        imgSrc={"/images/illustrations/Thinking.svg"}
                                        text={`“Nothing to see here… yet! Add some content to get going”`}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TablePending;
