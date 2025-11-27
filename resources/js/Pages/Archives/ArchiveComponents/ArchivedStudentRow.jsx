import React from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import { formatFullDate } from "../../../Utils/formatFullDate";
import { getRemainingDays } from "../../../Utils/getRemainingDays";
import ProfileImage from "../../../Components/ProfileImage";

export default function ArchivedStudentRow({
    student,
    setStudentId,
    setOpenAlertModal,
    setAction,
}) {
    const handleActionClick = (action) => {
        setOpenAlertModal(true);
        setStudentId(student.student_id);
        setAction(action);
    };
    return (
        <tr className="hover:bg-ascend-lightblue">
            <td>
                <div className="flex items-center gap-3">
                    <ProfileImage userData={student.user} />

                    <div className="font-bold">
                        {`${student.user.first_name} ${student.user.last_name}`}
                    </div>
                </div>
            </td>
            <td>
                {student.archived_by
                    ? `${student.archived_by.first_name} ${student.archived_by.last_name}`
                    : "N/A"}
            </td>
            <td>{formatFullDate(student.deleted_at)}</td>
            <td>{getRemainingDays(student.deleted_at, 30)}d</td>
            <td className="flex gap-2">
                <PrimaryButton
                    text={"Restore"}
                    btnColor={"bg-ascend-yellow"}
                    doSomething={() => handleActionClick("restore")}
                />
                <PrimaryButton
                    text={"Delete"}
                    btnColor={"bg-ascend-red"}
                    doSomething={() => handleActionClick("delete")}
                />
            </td>
        </tr>
    );
}
