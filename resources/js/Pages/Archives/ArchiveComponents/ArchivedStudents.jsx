import React, { use, useState } from "react";
import useArchives from "../../../Stores/Archives/archivedStore";
import { usePage } from "@inertiajs/react";
import ArchivedStudentRow from "./ArchivedStudentRow";
import AlertModal from "../../../Components/AlertModal";
import Pagination from "../../../Components/Pagination";
import EmptyState from "../../../Components/EmptyState/EmptyState";
import useArchive from "./Hooks/useArchive";

export default function ArchivedStudents() {
    const { archivedStudents } = usePage().props;

    const [openAlertModal, setOpenAlertModal] = useState(false);
    const [action, setAction] = useState(null);
    const [studentId, setStudentId] = useState(null);

    // Custom hook
    const { isLoading, handleRestoreStudent, handleForceDeleteStudent } =
        useArchive();

    return (
        <div className="font-nunito-sans space-y-5">
            <div className="flex justify-between items-center gap-5">
                <h1 className="text-size6 font-bold">Archived Students</h1>
            </div>

            <div className="overflow-x-auto overflow-y-hidden">
                <table className="table">
                    <thead className="">
                        <tr className="border-b-2 border-ascend-gray3">
                            <th className="text-ascend-black font-black">
                                Name
                            </th>
                            <th className="text-ascend-black font-black">
                                Archived by
                            </th>
                            <th className="text-ascend-black font-black">
                                Date archived
                            </th>
                            <th className="text-ascend-black font-black">
                                Days remaining
                            </th>
                        </tr>
                    </thead>
                    {archivedStudents.data.length > 0 && (
                        <tbody>
                            {archivedStudents.data.map((student) => (
                                <ArchivedStudentRow
                                    key={student.student_id}
                                    student={student}
                                    setOpenAlertModal={setOpenAlertModal}
                                    setStudentId={setStudentId}
                                    setAction={setAction}
                                />
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            {archivedStudents.data.length > 0 &&
                archivedStudents.total > 10 && (
                    <Pagination
                        links={archivedStudents.links}
                        currentPage={archivedStudents.current_page}
                        lastPage={archivedStudents.last_page}
                        only={["archivedStudents"]}
                    />
                )}

            {archivedStudents.data.length === 0 && (
                <EmptyState
                    imgSrc={"/images/illustrations/blank_canvas.svg"}
                    text={`“Looks empty! You haven’t archived any student yet.”`}
                />
            )}

            {/* Display alert modal */}
            {openAlertModal && (
                <AlertModal
                    title={
                        action === "restore"
                            ? "Restore Student"
                            : "Permanently Delete Student"
                    }
                    description={
                        action === "restore"
                            ? "Are you sure you want to restore this student?"
                            : "Are you sure you want to permanently delete this student? All data associated with this student will be permanently lost and cannot be recovered."
                    }
                    closeModal={() => setOpenAlertModal(false)}
                    onConfirm={() => {
                        if (action === "restore") {
                            handleRestoreStudent(studentId, setOpenAlertModal);
                        } else {
                            handleForceDeleteStudent(
                                studentId,
                                setOpenAlertModal
                            );
                        }
                    }}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}
