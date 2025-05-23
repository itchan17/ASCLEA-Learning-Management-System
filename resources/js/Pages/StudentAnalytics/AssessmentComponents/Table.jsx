import React from 'react'
import { IoSearch } from "react-icons/io5";
import { BiFilter } from "react-icons/bi";
import PrimaryButton from "../../../Components/Button/PrimaryButton"; 
import useAssessmentStore from "../../../Stores/StudentAnalytics/AssessmentStore";
import { router } from "@inertiajs/react";


const Table = () => {

    const assessmentList = useAssessmentStore((state) => state.assessmentList);


    const handleRowClick = (assessmentID) => {
        console.log(assessmentID);
        router.visit(`/student-analytics/${1}/Assessment/${assessmentID}`);
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
                {assessmentList?.length > 0 && (
                    <tbody>
                    {assessmentList.map((a, index) => (
                               <tr
                                    key={index}
                                    onClick={() => handleRowClick(a.assessmentID)}
                                    className="hover:bg-ascend-lightblue cursor-pointer"
                                >
                                    <td>{a.assessmentTitle}</td>
                                    <td>{a.assessmentCourse}</td>
                                    <td>{a.assessmentType}</td>
                                    <td>{a.assessmentDueDate}</td>
                                    <td>
                                        <span>
                                            View
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}

            </table>
        </div>
    </>
  )
}

export default Table;