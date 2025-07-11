import React from "react";
import EmptyState from "../../../../Components/EmptyState/EmptyState";
import usePeopleStore from "../../../../Stores/Programs/peopleStore";
import { router } from "@inertiajs/react";
import CustomSelect from "../../../../Components/CustomInputField/CustomSelect";
import { IoSearch } from "react-icons/io5";
import { useRoute } from "ziggy-js";
import RoleGuard from "../../../../Components/Auth/RoleGuard";

export default function PeopleTable() {
    // People Store
    const peopleList = usePeopleStore((state) => state.peopleList);

    const route = useRoute();

    const handleRowClick = (userId) => {
        router.visit(route("program.user.view", { programId: 1, userId }));
    };

    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row justify-end gap-2">
                <CustomSelect
                    selectField={
                        <select className="w-full sm:w-40 rounded-none appearance-none border p-2 h-9 text-size1  focus:outline-ascend-blue">
                            <option className="" value="">
                                All
                            </option>
                            <option value="student">Student</option>
                            <option value="educator">Educator</option>
                        </select>
                    }
                />
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
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    {peopleList?.length > 0 && (
                        <tbody>
                            {peopleList.map((p, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleRowClick(p.id)}
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
                                    <td>{p.role}</td>
                                    <td>{p.email}</td>
                                    <RoleGuard allowedRoles={["admin"]}>
                                        <td>
                                            <span className="text-ascend-red underline">
                                                Remove
                                            </span>
                                        </td>
                                    </RoleGuard>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                {peopleList?.length === 0 && (
                    <EmptyState
                        paddingY="py-0"
                        imgSrc={"/images/illustrations/alone.svg"}
                        text={`“It’s a bit lonely here... Add some people and let the learning begin!”`}
                    />
                )}
            </div>
        </div>
    );
}
