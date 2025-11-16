import React from "react";
import { formatFullDate } from "../../../Utils/formatFullDate";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import { getRemainingDays } from "../../../Utils/getRemainingDays";
import useArchive from "./Hooks/useArchive";

export default function ArchivedStaffRow({ staff }) {
    // Custom hook
    const { isRestoreLoading, handleRestoreStaff } = useArchive();

    return (
        <tr className="hover:bg-ascend-lightblue">
            <td>
                <div className="flex items-center gap-3">
                    <img
                        src={
                            staff.user.profile_image &&
                            `/storage/${staff.user.profile_image}`
                        }
                        alt="Profile image"
                        className="w-12 h-12 bg-ascend-gray1/20 rounded-4xl shrink-0"
                    ></img>

                    <div className="font-bold">
                        {`${staff.user.first_name} ${staff.user.last_name}`}
                    </div>
                </div>
            </td>
            <td>Juan Dela Cruz</td>
            <td>{formatFullDate(staff.deleted_at)}</td>
            <td>{getRemainingDays(staff.deleted_at, 30)}d</td>
            <td className="flex gap-2">
                <PrimaryButton
                    text={"Restore"}
                    btnColor={"bg-ascend-yellow"}
                    doSomething={() => handleRestoreStaff(staff.staff_id)}
                    isLoading={isRestoreLoading}
                    isDisabled={isRestoreLoading}
                />
                <PrimaryButton
                    text={"Delete"}
                    btnColor={"bg-ascend-red"}
                    isDisabled={isRestoreLoading}
                />
            </td>
        </tr>
    );
}
