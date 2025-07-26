import React from 'react'
import EmptyState from "../../../Components/EmptyState/EmptyState";
import useEnrolledStore from "../../../Stores/Admission/EnrolledStore";
import { BiFilter } from "react-icons/bi";
import { router } from "@inertiajs/react";
import { IoSearch } from "react-icons/io5";
import { useRoute } from "ziggy-js";


const EnrolledTable = () => {

    const enrolledList = useEnrolledStore((state) => state.enrolledList);

    const route = useRoute();

    const handleRowClick = (studentid) => {
        router.visit(route("enrolled.student.view", { studentid }));
    };

  return (
  <>
  <div className="flex justify-end">
    <BiFilter className='text-size5' />
    <div className='font-bold text-size2 pr-10'>Filter</div>
    <div className="relative">
      <input
        className="w-full sm:w-50 border h-9 pl-10 p-2 border-ascend-black focus:outline-ascend-blue just"
        type="text"
        placeholder="Search name"
      />
      <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-ascend-gray1" />
    </div>
  </div>

    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="border-b-2 border-ascend-gray3">
            <th>Name</th>
            <th>Program</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        {enrolledList?.length > 0 && (
          <tbody>
            {enrolledList.map((p, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(p.id)}
                className="hover:bg-ascend-lightblue cursor-pointer border-b border-ascend-gray1"
              >
                <td className="py-5">{p.first_name} {p.last_name}</td>
                <td className="py-5">{p.program}</td>
                <td className="py-5">{p.email}</td>
                <td className={`py-5 ${p.status === 'Enrolled' ? 'text-ascend-blue' : p.status === 'Drop' ? 'text-ascend-red' : 'text-ascend-yellow'}`}>{p.status}</td>
                <td className="py-5">
                    <span className="text-ascend-blue underline">
                    View More
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {enrolledList?.length === 0 && (
        <EmptyState
          paddingY="py-0"
          imgSrc={"/images/illustrations/Thinking.svg"}
          text={`“Nothing to see here… yet! Add some content to get going”`}
        />
      )}
    </div>
  </>
);
}

export default EnrolledTable;