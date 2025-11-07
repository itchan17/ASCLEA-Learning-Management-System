import React from "react";
import EmptyState from "../../../Components/EmptyState/EmptyState";
import { router } from "@inertiajs/react";
import { IoSearch } from "react-icons/io5";
import { useRoute } from "ziggy-js";

const EnrolledTable = ({ enrolledStudents }) => {
  const route = useRoute();

  const handleRowClick = (studentId) => {
    router.visit(route("enrolled.student.view", { student: studentId }));
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
              <th>Date Enrolled</th>
              <th>Status</th>
            </tr>
          </thead>

          {enrolledStudents?.length > 0 && (
            <tbody>
              {enrolledStudents.map((student, index) => {
                const status = student.enrollment_status?.toLowerCase();
                const statusColor =
                  status === "enrolled"
                    ? "text-ascend-blue"
                    : status === "dropout"
                    ? "text-ascend-red"
                    : status === "withdrawn"
                    ? "text-ascend-yellow"
                    : "text-ascend-gray2";
                return (
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
                    <td className={`py-5 capitalize ${statusColor}`}>
                      {student.enrollment_status}
                    </td>
                    <td className="py-5">
                      <span className="text-ascend-blue underline">
                        View More
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}

          {enrolledStudents?.length === 0 && (
            <tbody>
              <tr>
                <td colSpan="5">
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

export default EnrolledTable;
