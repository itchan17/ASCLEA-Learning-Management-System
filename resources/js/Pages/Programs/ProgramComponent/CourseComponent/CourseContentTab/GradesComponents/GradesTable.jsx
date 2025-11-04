import React from "react";
import { IoSearch } from "react-icons/io5";
import usePeopleStore from "../../../../../../Stores/Programs/peopleStore";
import EmptyState from "../../../../../../Components/EmptyState/EmptyState";
import { FaSort } from "react-icons/fa";
import { BiSortUp } from "react-icons/bi";

export default function GradesTable() {
    // People Store
    const peopleList = usePeopleStore((state) => state.peopleList);
    return (
        <div className="space-y-5">
            <div className="w-full flex justify-end">
                <div className="flex flex-wrap w-full sm:w-fit gap-2">
                    <select
                        className={`textField border w-full sm:w-40 px-3 py-2  focus:outline-ascend-blue`}
                    >
                        <option value="">All</option>
                        <option value="graded">Graded</option>
                        <option value="returned">Returned</option>
                    </select>
                    <div className="relative w-full sm:w-60">
                        <input
                            className="border w-full pl-10 pr-3 py-2 border-ascend-black focus:outline-ascend-blue"
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
                            <th className="w-0">
                                <div className="flex items-center mb-0 gap-2 text-ascend-black font-black">
                                    <input
                                        type="checkbox"
                                        className="accent-ascend-blue w-4 h-4 cursor-pointer"
                                    />
                                    <span>Select all</span>
                                </div>
                            </th>
                            <th className="text-ascend-black font-black">
                                <div className="flex space-x-1 items-center hover:bg-ascend-lightblue transition-all duration-300 w-fit p-2 cursor-pointer">
                                    <p>Last Name</p>
                                    <span className="text-size4 ">
                                        <FaSort />
                                    </span>
                                </div>
                            </th>
                            <th className="text-ascend-black font-black">
                                <div className="flex space-x-1 items-center hover:bg-ascend-lightblue transition-all duration-300 w-fit p-2 cursor-pointer">
                                    <p>First Name</p>
                                    <span className="text-size4 ">
                                        <FaSort />
                                    </span>
                                </div>
                            </th>
                            <th className="text-ascend-black font-black">
                                Status
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
                                        <input
                                            type="checkbox"
                                            className="accent-ascend-blue w-4 h-4 cursor-pointer"
                                        />
                                    </td>
                                    <td>
                                        <p className="font-bold">Doe</p>
                                    </td>
                                    <td>
                                        <p className="font-bold">John</p>
                                    </td>
                                    <td>
                                        <p className="text-ascend-blue">
                                            Graded
                                        </p>
                                    </td>
                                    <td>{p.email}</td>
                                    <td>
                                        <div className="space-x-2 flex flex-nowrap items-center">
                                            <input
                                                className="w-16 border h-9 p-2 border-ascend-black focus:outline-ascend-blue"
                                                type="number"
                                                min={0}
                                                max={999}
                                                onKeyDown={(e) => {
                                                    if (
                                                        e.key === "-" ||
                                                        e.key === "e" ||
                                                        e.key === "+"
                                                    ) {
                                                        e.preventDefault(); // prevent invalid characters
                                                    }
                                                }}
                                                // onChange={(e) => {if(e.value.length)}}
                                            />

                                            <span className="text-nowrap ml-3">
                                                Saving
                                            </span>
                                        </div>
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
