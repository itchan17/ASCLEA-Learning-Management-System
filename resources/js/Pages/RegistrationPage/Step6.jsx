import React from 'react'
import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';            
import Step3 from './Step3';
import Step4 from './Step4';

const Step6 = () => {
    const [edit, setEdit] = useState(false);

  return (
    <div className="mx-auto max-w-4xl border-[2px] border-[#8A8989] bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-size4 font-semibold text-left text-black">Registration Information</h3>
            
            {edit == false && (
            <button onClick={() => setEdit(true)} className="bg-ascend-blue text-white px-6 py-2 hover:bg-[#2a2aad]"> 
                Edit
            </button>
            )}

            {edit === true && (
                <div className="flex gap-4">
                    <button type="button" onClick={() => setEdit(false)} className="border-2 border-ascend-blue text-ascend-blue px-6 py-2 hover:bg-ascend-blue hover:text-white">
                        Cancel
                    </button>

                    <button onClick={() => setEdit(false)} className="bg-ascend-blue text-white px-6 py-2 hover:bg-[#2a2aad]">
                        Save
                    </button>
                </div>
            )}

        </div>
        
        <div className="flex flex-col gap-4">
            <Step1 noBorder />
            <Step2 noBorder />
            <Step3 noBorder />
            <Step4 noBorder />
        </div>
    
    </div>
  )
}

export default Step6;