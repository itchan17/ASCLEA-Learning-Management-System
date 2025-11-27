import React from "react";
import PaidStudentTable from "./StaffAccounting/PaidStudentTable";

export default function AccountingPage({ students }) {
  return (
    <div className="p-4">
      <PaidStudentTable students={students} />
    </div>
  );
}
