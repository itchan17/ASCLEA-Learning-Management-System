import React from "react";
import { BiFilter } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import useArchives from "../../../Stores/Archives/archivedStore";

export default function ArchivedStaff() {
    const archivedStaffList = useArchives((state) => state.archivedStaffList);

    return (
        <div className="font-nunito-sans space-y-5">
            <div className="flex justify-between items-center gap-5">
                <h1 className="text-size6 font-bold">Archived Staff</h1>
                <div className="flex justify-end items-center">
                    <BiFilter className="text-size5 shrink-0" />
                    <div className="font-bold text-size2 pr-10">Filter</div>
                    <div className="relative">
                        <input
                            className="w-full sm:w-50 border h-9 pl-10 p-2 border-ascend-black focus:outline-ascend-blue"
                            type="text"
                            placeholder="Search name"
                        />
                        <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
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
                    {archivedStaffList?.length > 0 && (
                        <tbody>
                            {archivedStaffList.map((staff, index) => (
                                <tr
                                    key={staff.id}
                                    className="hover:bg-ascend-lightblue cursor-pointer"
                                >
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-ascend-gray1 rounded-4xl shrink-0"></div>

                                            <div className="font-bold">
                                                {`${staff.firstName} ${staff.lastName}`}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{staff.archivedBy}</td>
                                    <td>{staff.archivedDate}</td>
                                    <td>{staff.daysRemaining} days</td>
                                    <td>
                                        <span className="text-ascend-yellow underline">
                                            Restore
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-ascend-red underline">
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                {archivedStaffList?.length === 0 && (
                    <EmptyState
                        paddingY="py-0"
                        imgSrc={"/images/illustrations/grades.svg"}
                        text={`“Oops! No one to hand an A+ to. Add your first student to get started.”`}
                    />
                )}
            </div>
        </div>
    );
}
