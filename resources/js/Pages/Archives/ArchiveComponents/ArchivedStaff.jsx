import React from "react";
import { usePage } from "@inertiajs/react";
import Pagination from "../../../Components/Pagination";
import ArchivedStaffRow from "./ArchivedStaffRow";
import EmptyState from "../../../Components/EmptyState/EmptyState";

export default function ArchivedStaff() {
    const { archivedStaff } = usePage().props;

    return (
        <div className="font-nunito-sans space-y-5">
            <div className="flex justify-between items-center gap-5">
                <h1 className="text-size6 font-bold">Archived Staff</h1>
            </div>

            <div className="overflow-x-auto overflow-y-hidden space-y-5">
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
                    {archivedStaff.data.length > 0 && (
                        <tbody>
                            {archivedStaff.data.map((staff) => (
                                <ArchivedStaffRow
                                    key={staff.staff_id}
                                    staff={staff}
                                />
                            ))}
                        </tbody>
                    )}
                </table>
                {archivedStaff.data.length > 0 && archivedStaff.total > 10 && (
                    <Pagination
                        links={archivedStaff.links}
                        currentPage={archivedStaff.current_page}
                        lastPage={archivedStaff.last_page}
                        only={["archivedStaff"]}
                    />
                )}

                {archivedStaff.data.length === 0 && (
                    <EmptyState
                        imgSrc={"/images/illustrations/blank_canvas.svg"}
                        text={`“Looks empty! You haven’t archived any staff yet.”`}
                    />
                )}
            </div>
        </div>
    );
}
