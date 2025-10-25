import React from 'react'
import { IoSearch } from "react-icons/io5";
import { BiFilter } from "react-icons/bi";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import { Link } from "@inertiajs/react";
import TablePending from "./TablePending";

const PendingPage = () => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='font-nunito-sans text-size6 font-bold'>To Be Approved</div>
        <PrimaryButton
          text ="Download"
        />
      </div>

      <TablePending />




    </>
  )
}

export default PendingPage;