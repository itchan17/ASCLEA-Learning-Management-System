import React from 'react'; 
import { useEffect } from "react";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import useAccountingStore from "../../../Stores/Accounting/AccountingStore";
import ModalContainer from "../../../Components/ModalContainer";

const PaidStudentTable = () => {
  const AccountingList = useAccountingStore((state) => state.AccountingList);
  const fetchPaidStudents = useAccountingStore((state) => state.fetchPaidStudents);
  const route = useRoute();

  useEffect(() => {
    fetchPaidStudents(); 
  }, []);

  const handleRowClick = (studentId) => {
    router.visit(route("accounting.student.view", { studentId }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="border-b-2 border-ascend-gray3">
            <th>Name</th>
            <th>Program</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        {AccountingList?.length > 0 && (
        <tbody>
            {AccountingList.map((s, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(s.id)}
                className="hover:bg-ascend-lightblue cursor-pointer border-b border-ascend-gray1"
              >
                <td className="py-5">{s.name}</td>
                <td className="py-5">{"N/A"}</td>
                <td className="py-5">{s.email}</td>
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
    </div>
  );
};

export default PaidStudentTable;
