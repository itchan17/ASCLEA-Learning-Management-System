import React from 'react'
import { useState } from 'react';
import useRegistrationStore from "../../Stores/Registration/registrationStore";

export const Step4 = ({ noBorder = false, edit = false }) => {
    console.log("Render Registration Step 4");

    const registration = useRegistrationStore((state) => state.registration);
      const handleRegistrationChange = useRegistrationStore(
      (state) => state.handleRegistrationChange
    );
    
  return (
    <div className={`${noBorder ? '' : 'mx-auto max-w-4xl border-[2px] border-ascend-gray1 bg-white p-10 shadow-lg'}`}>
      <h3 className="text-size4 mb-4 font-nunito-sans font-bold text-left text-black">Select Program</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className={`border-[2px] ${registration.selectedprog === "LET" ? " border-ascend-blue" : "border-ascend-gray1"}  bg-white p-4 shadow-lg`}>
          <div className="flex items-center space-x-3">
            <input type="checkbox" disabled={edit} checked={registration.selectedprog === "LET"} value={registration.selectedprog} onChange={(e) => handleRegistrationChange("selectedprog", e.target.checked ? "LET" : "")} className="w-5 h-5 rounded-full border border-ascend-gray1 shrink-0" />
            <label className="font-nunito-sans text-size3">Licensure Examination for Teachers (LET)</label>
          </div>  
        </div>

        <div className={`border-[2px] ${registration.selectedprog === "CTP" ? "border-ascend-blue" : "border-ascend-gray1"} bg-white p-4 shadow-lg`}>
          <div className="flex items-center space-x-3">
            <input type="checkbox" disabled={edit} checked={registration.selectedprog === "CTP"} value={registration.selectedprog} onChange={(e) => handleRegistrationChange("selectedprog", e.target.checked ? "CTP" : "")} className="w-5 h-5 rounded-full border border-ascend-gray1 shrink-0" />
            <label className="font-nunito-sans text-size3">Certificate in Teaching Program</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
