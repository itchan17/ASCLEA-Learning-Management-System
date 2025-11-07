import React from "react";
import EmptyState from "../../../Components/EmptyState/EmptyState";
import { IoSearch } from "react-icons/io5";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

const TablePending = ({ pendingStudents }) => {
  const route = useRoute();

  const handleRowClick = (studentid) => {
    router.visit(route("pending.student.view", { student: studentid }));
  };

  return (
    <>
      <div className="flex justify-end items-center mb-3">
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
        <table className="table w-full">
          <thead>
            <tr className="border-b-2 border-ascend-gray3">
              <th>Name</th>
              <th>Email</th>
              <th>Date Applied</th>
              <th>Admission Status</th>
              <th></th>
            </tr>
          </thead>

          {pendingStudents?.length > 0 && (
            <tbody>
              {pendingStudents.map((student, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(student.student_id)}
                  className="hover:bg-ascend-lightblue cursor-pointer border-b border-ascend-gray1"
                >
                  <td className="py-5">
                    {student.user.first_name} {student.user.last_name}
                  </td>
                  <td className="py-5">{student.user.email}</td>
                  <td className="py-5">
                    {new Date(student.created_at).toLocaleDateString()}
                  </td>
                  <td
                    className={`py-5 ${
                      student.admission_status === "Accepted"
                        ? "text-ascend-blue"
                        : student.admission_status === "Not Submitted"
                        ? "text-ascend-red"
                        : student.admission_status === "Submitted"
                        ? "text-ascend-yellow"
                        : student.admission_status === "Reviewing"
                        ? "text-ascend-green"
                        : "text-ascend-gray2"
                    }`}
                  >
                    {student.admission_status}
                  </td>
                  <td className="py-5">
                    <span className="text-ascend-blue underline">
                      View More
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          )}

          {pendingStudents?.length === 0 && (
            <tbody>
              <tr>
                <td colSpan="4">
                  <EmptyState
                    paddingY="py-0"
                    imgSrc={"/images/illustrations/Thinking.svg"}
                    text={`“Nothing to see here… yet! Add some content to get going”`}
                  />
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default TablePending;
