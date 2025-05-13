import React from 'react'
import { useState } from 'react';

export const Step4 = ({ noBorder = false, edit = false }) => {
  const [selectedProgram, setSelectedProgram] = useState("");


  return (
    <div className={`${noBorder ? '' : 'mx-auto max-w-4xl border-[2px] border-ascend-gray1 bg-white p-10 shadow-lg'}`}>
      <h3 className="text-size4 mb-4 font-semibold text-left text-black">Select Program</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className={`border-[2px] ${selectedProgram === "LET" ? " border-ascend-blue" : "border-ascend-gray1"}  bg-white p-4 shadow-lg`}>
          <div className="flex items-center space-x-3">
            <input type="checkbox" disabled={edit} checked={selectedProgram === "LET"} onChange={() => setSelectedProgram("LET")} className="w-5 h-5 rounded-full border border-ascend-gray1 shrink-0" />
            <label className="font-medium text-size3">Licensure Examination for Teachers (LET)</label>
          </div>  
        </div>

        <div className={`border-[2px] ${selectedProgram === "Certificate" ? "border-ascend-blue" : "border-ascend-gray1"} bg-white p-4 shadow-lg`}>
          <div className="flex items-center space-x-3">
            <input type="checkbox" disabled={edit} checked={selectedProgram === "Certificate"} onChange={() => setSelectedProgram("Certificate")} className="w-5 h-5 rounded-full border border-ascend-gray1 shrink-0" />
            <label className="font-medium text-size3">Certificate in Teaching Program</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
