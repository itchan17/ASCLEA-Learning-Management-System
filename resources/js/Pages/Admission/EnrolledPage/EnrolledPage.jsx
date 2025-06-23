import React from 'react'
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import EnrolledTable from "./EnrolledTable";


import { Link } from "@inertiajs/react";


const EnrolledPage = () => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='font-nunito-sans text-size6 font-bold'>Student List</div>
        <PrimaryButton
          text ="Download"
        />
      </div>

      <EnrolledTable />

    </>
  )
}

export default EnrolledPage;