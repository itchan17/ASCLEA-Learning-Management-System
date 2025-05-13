import React from 'react'
import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';            
import Step3 from './Step3';
import Step4 from './Step4';

import PrimaryButton from "../../Components/Button/PrimaryButton";

const Step6 = () => {
    const [edit, setEdit] = useState(true);

  return (
    <div className="mx-auto max-w-4xl border-[2px] border-ascend-gray1 bg-white p-10 shadow-lg">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-size4 font-semibold text-left text-black">Registration Information</h3>
            
            {edit == true && (
            <PrimaryButton
            doSomething={() => setEdit(false)} 
            text = "Edit"
            />
            )}

            {edit === false && (
                <div className="flex gap-4">
                    <PrimaryButton type="button" 
                    doSomething={() => setEdit(true)}
                    btnColor="bg-white border-2 border-ascend-blue hover:bg-ascend-blue group"
                    textColor = "text-ascend-blue group-hover:text-white"
                    text = "Cancel"
                    />

                    <PrimaryButton doSomething={() => setEdit(true)}
                    text = "Save"
                    />

                </div>
            )}

        </div>
        
        <div className="flex flex-col gap-4">
            <Step1 noBorder edit={edit}/>
            <Step2 noBorder edit={edit}/>
            <Step3 noBorder edit={edit}/>
            <Step4 noBorder edit={edit}/>
        </div>
    
    </div>
  )
}

export default Step6;