import React from 'react'
import { IoSearch } from "react-icons/io5";
import { BiFilter } from "react-icons/bi";
import useStudentStore from "../../../Stores/StudentAnalytics/StudentStore";
import { router } from "@inertiajs/react";
import StudentModal from './StudentModal';
import { useState } from 'react';

const Table = () => {
    const [selectedId, setSelectedId] = useState(null);
    const assessmentStudent = useStudentStore((state) => state.studentList);

    const openModal = () => {
        const modal = document.getElementById('studentModal');
        if (modal) modal.showModal();
    };

  return (
    <>

        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4">
            <div className="flex items-center gap-1 pr-3">
                <BiFilter className="text-size5 text-black font-bold" />
                <p className="text-size2 font-nunito-sans font-bold ">Filter</p>
            </div>

            <div className="relative w-full sm:w-64">
                <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-size4 text-ascend-gray1" />
                <input
                type="text"
                placeholder="Search name"
                className="w-full border h-9 pl-10 pr-3 text-sm border-ascend-black focus:outline-none focus:ring-2 focus:ring-ascend-blue"
                />
            </div>

        </div>


        <div className="overflow-x-auto pt-7.5">
              <table className="table">
                  <thead className="">
                      <tr className="border-b-2 border-ascend-gray3">
                          <th>Name</th>
                          <th>Time</th>
                          <th>Score</th>
                    </tr>
                </thead>
                {assessmentStudent?.length > 0 && (
                    <tbody>
                    {assessmentStudent.map((a, index) => (
                               <tr
                                    key={index}
                                    onClick={() => {openModal(), setSelectedId(a.id)}}
                                    className="hover:bg-ascend-lightblue cursor-pointer"
                                >
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-ascend-gray1 rounded-4xl"></div>

                                            <div className="font-bold">
                                                {a.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{a.time}</td>
                                    <td>{a.score}</td>
                                    <td>
                                        <span>
                                            View More
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}

            </table>
             <StudentModal id={selectedId} />

        </div>
    </>
  )
}

export default Table;