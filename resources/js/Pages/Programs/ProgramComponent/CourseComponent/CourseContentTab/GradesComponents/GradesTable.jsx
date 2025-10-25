import React from "react";
import { IoSearch } from "react-icons/io5";
import usePeopleStore from "../../../../../../Stores/Programs/peopleStore";
import EmptyState from "../../../../../../Components/EmptyState/EmptyState";

export default function GradesTable() {
    // People Store
    const peopleList = usePeopleStore((state) => state.peopleList);
    return (
        <div className="space-y-5">
            <div className="flex justify-end">
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
                <table className="table">
                    <thead className="">
                        <tr className="border-b-2 border-ascend-gray3">
                            <th className="text-ascend-black font-black">
                                Name
                            </th>
                            <th className="text-ascend-black font-black">
                                Email
                            </th>
                            <th className="text-ascend-black font-black">
                                Grade
                            </th>
                        </tr>
                    </thead>
                    {peopleList?.length > 0 && (
                        <tbody>
                            {peopleList.map((p, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-ascend-lightblue cursor-pointer"
                                >
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-ascend-gray1 rounded-4xl"></div>

                                            <div className="font-bold">
                                                {p.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{p.email}</td>
                                    <td>
                                        <input
                                            className="w-12 border h-9 p-2 border-ascend-black focus:outline-ascend-blue"
                                            type="number"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                {peopleList?.length === 0 && (
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
