import React from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import TablePending from "./TablePending";
import { IoSearch } from "react-icons/io5";
import { BiFilter } from "react-icons/bi";

const PendingPage = ({ pendingStudents }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="font-nunito-sans text-size6 font-bold">To Be Approved</div>
        {/*<PrimaryButton text="Download" />*/}
      </div>

      <TablePending pendingStudents={pendingStudents} />
    </>
  );
};

export default PendingPage;
