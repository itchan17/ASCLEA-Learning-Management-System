import React from 'react'
import { useState } from 'react';

export const Step4 = ({ noBorder = false }) => {
  
  return (
    <div className={`${noBorder ? '' : 'mx-auto max-w-4xl border-[2px] border-[#8A8989] bg-white p-6 shadow-lg'}`}>
      <h3 className="text-size4 mb-4 font-semibold text-left text-black">Select Program</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border-[2px] border-[#8A8989] bg-white p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="w-10 h-10 rounded-full border border-[#8A8989]" />
            <label className="font-medium text-size3">Licensure Examination for Teachers (LET)</label>
          </div>
        </div>

        <div className="border-[2px] border-[#8A8989] bg-white p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="w-10 h-10 rounded-full border border-[#8A8989]" />
            <label className="font-medium text-size3">Certificate in Teaching Program</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;

