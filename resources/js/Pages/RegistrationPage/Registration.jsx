import React, { useState } from 'react';
import { GoArrowLeft } from "react-icons/go";
import { GoCheck } from "react-icons/go";

import Step1 from './Step1';
import Step2 from './Step2';    
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';  

function Registration() {
  const [currentStep, setCurrentStep] = useState(1);

  const showStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      case 6:
        return <Step6 />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-16">
      <div className="mb-6">
        <img src="/images/ascend_logo.png" alt="Ascend Logo" className="h-14" />
        <div className="flex mt-2 ml-10 md:ml-20">
          <GoArrowLeft
            className="text-2xl cursor-pointer"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          />
        </div>
      </div>

      <div className="text-center text-size6 font-semibold text-black mb-10">Enrollment Form</div>


      <div className="text-center">
        <div className="flex justify-center items-center space-x-0 mb-0">
          
          <div className={`w-12 h-12 border-4 ${currentStep >= 1 ? 'border-ascend-blue' : 'border-gray-500'} ${currentStep > 1 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0 `}>
            <div className={`${currentStep == 1 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
            {currentStep > 1 && <GoCheck className="text-white text-size4 font-bold" />}
            </div>
          </div>
          <div className={`h-1 w-24 ${currentStep > 1 ? 'bg-ascend-blue' : 'bg-gray-500'}`}></div>

          <div className={`w-12 h-12 border-4 ${currentStep >= 2 ? 'border-ascend-blue' : 'border-gray-500'} ${currentStep > 2 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0`}>
            <div className={`${currentStep == 2 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
            {currentStep > 2 && <GoCheck className="text-white text-size4 font-bold" />}
            </div>
          </div>
          <div className={`h-1 w-24 ${currentStep > 2 ? 'bg-ascend-blue' : 'bg-gray-500'}`}></div>

          <div className={`w-12 h-12 border-4 ${currentStep >= 3 ? 'border-ascend-blue' : 'border-gray-500'} ${currentStep > 3 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0`}>
            <div className={`${currentStep == 3 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
            {currentStep > 3 && <GoCheck className="text-white text-size4 font-bold" />}
            </div>
          </div>
          <div className={`h-1 w-24 ${currentStep > 3 ? 'bg-ascend-blue' : 'bg-gray-500'}`}></div>

          <div className={`w-12 h-12 border-4 ${currentStep >= 4 ? 'border-ascend-blue' : 'border-gray-500'} ${currentStep > 4 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0`}>
            <div className={`${currentStep == 4 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
            {currentStep > 4 && <GoCheck className="text-white text-size4 font-bold" />}
            </div>
          </div>
          <div className={`h-1 w-24 ${currentStep > 4 ? 'bg-ascend-blue' : 'bg-gray-500'}`}></div>

          <div className={`w-12 h-12 border-4 ${currentStep >= 5 ? 'border-ascend-blue' : 'border-gray-500'} ${currentStep > 5 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0`}>
            <div className={`${currentStep == 5 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
            {currentStep > 5 && <GoCheck className="text-white text-size4 font-bold" />}
            </div>
          </div>
          <div className={`h-1 w-24 ${currentStep > 5 ? 'bg-ascend-blue' : 'bg-gray-500'}`}></div>

          <div className={`w-12 h-12 border-4 ${currentStep >= 6 ? 'border-ascend-blue' : 'border-gray-500'} ${currentStep > 6 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0`}>
            <div className={`${currentStep == 6 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
            {currentStep > 6 && <GoCheck className="text-white text-size4 font-bold" />}
            </div>
          </div>

        </div>

        
        <div className="hidden sm:flex justify-center items-center space-x-25 mb-10">
          <div className={`text-size2 font-semibold ml-6 mr-13 ${currentStep >= 1 ? 'text-ascend-blue' : 'text-gray-500'}`}>Personal &<br />Contact<br />Information</div>
          <div className={`text-size2 font-semibold ml-1 mr-5 ${currentStep >= 2 ? 'text-ascend-blue' : 'text-gray-500'}`}>Education &<br />Employment<br />&nbsp;</div>
          <div className={`text-size2 font-semibold ml-8 mr-10 ${currentStep >= 3 ? 'text-ascend-blue' : 'text-gray-500'}`}>Family/<br />Guardian<br />Information</div>
          <div className={`text-size2 font-semibold ml-7 mr-10 ${currentStep >= 4 ? 'text-ascend-blue' : 'text-gray-500'}`}>Select<br />Program<br />&nbsp;</div>
          <div className={`text-size2 font-semibold ml-9 mr-10 ${currentStep >= 5 ? 'text-ascend-blue' : 'text-gray-500'}`}>Terms <br />and<br />Conditions</div>
          <div className={`text-size2 font-semibold ml-9 mr-10 ${currentStep >= 6 ? 'text-ascend-blue' : 'text-gray-500'}`}>Review<br />&nbsp;<br />&nbsp;</div>

        </div>
          
        
      </div>




      <form className="space-y-4">
        {showStep()}
      </form>

    <div className="w-full max-w-4xl mx-auto flex space-x-4 justify-end mt-4">

      {currentStep > 1 && (
      <button type="button"
        onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
        className= "border-2 border-ascend-blue text-ascend-blue px-6 py-2 hover:bg-ascend-blue hover:text-white"
      >
        Back
      </button>
      )}

      {currentStep < 6 && (  
      <button
        type="button"
        onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 6))}
        className="bg-ascend-blue text-white px-6 py-2 hover:bg-[#2a2aad]"
      >
        Next Step
      </button>
      )}

      {currentStep === 6 && (
        <button
        type="button"
        onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 6))}
        className="bg-ascend-blue text-white px-6 py-2 hover:bg-[#2a2aad]"
      >
        Save
      </button>
      )}



    </div>
    </div>
  );
}

export default Registration;
Registration.layout = null;
