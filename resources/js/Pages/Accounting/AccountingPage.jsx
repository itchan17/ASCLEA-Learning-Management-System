import React from 'react';
import { BiFilter } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import PaidStudentTable from './StaffAccounting/PaidStudentTable';
import PaymentHistoryPage from './StaffAccounting/PaymentHistoryPage';

export default function AccountingPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="font-nunito-sans text-size6 font-bold">Paid Students</div>
        <div className="flex justify-end">
          
          {/* Filter Section */}
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
      </div>
      
      <PaidStudentTable />
    </div>
  );
}
