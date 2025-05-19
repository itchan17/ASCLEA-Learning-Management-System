import React, { useState } from 'react';
import { GoArrowLeft } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import useRegistrationStore from "../../Stores/Registration/registrationStore";
import { router } from '@inertiajs/react';
import validator from 'validator';


import Step1 from './Step1';
import Step2 from './Step2';    
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';  
import Step7 from './Step7';
import SuccessPage from './SuccessPage';

import PrimaryButton from "../../Components/Button/PrimaryButton";

function Registration() {

  const [currentStep, setCurrentStep] = useState(1);
  
  const addRegistration = useRegistrationStore((state) => state.addRegistration);
  const registrationList = useRegistrationStore((state) => state.registrationList);

    const registration = useRegistrationStore((state) => state.registration);
    const handleRegistrationChange = useRegistrationStore(
      (state) => state.handleRegistrationChange
  );

  const handleAdd = (e) => {
    addRegistration();
    const updatedList = useRegistrationStore.getState().registrationList;
    console.log(updatedList);

   };

  const handleValidation = () => {
    if (currentStep === 1 || currentStep === 7) {
      if (validator.isEmpty(registration.lastname, {ignore_whitespace: true})) {
        alert("Lastname name is required");
        return false;
      };
      if (validator.isEmpty(registration.firstname, {ignore_whitespace: true})) {
        alert("First name is required");
        return false;
      };
      if (validator.isEmpty(registration.birthday)) {
        alert("Birthday is required");
        return false;
      };
      if (validator.isEmpty(registration.sex)) {
        alert("Sex is required");
        return false;
      };
      if (validator.isEmpty(registration.contactnumber, {ignore_whitespace: true})) {
        alert("Contact number is required");
        return false;
      };
      if (!validator.isNumeric(registration.contactnumber)|| registration.contactnumber.length !== 11 || !registration.contactnumber.startsWith("09") ) {
        alert("Invalid contact number");
        return false;   
      };
      if (validator.isEmpty(registration.emailaddress, {ignore_whitespace: true})) {
        alert("Email address is required");
        return false;
      };
      if (!validator.isEmail(registration.emailaddress)) {
        alert("Invalid email address");
        return false;
      };
      if (validator.isEmpty(registration.address, {ignore_whitespace: true})) {
        alert("Address is required");
        return false;
      };
      if (validator.isEmpty(registration.region)) {
        alert("Region is required");
        return false;
      };
      if (validator.isEmpty(registration.province)) {
        alert("Province is required");
        return false;
      };
      if (validator.isEmpty(registration.city)) {
        alert("City is required");
        return false;
      };
      if (validator.isEmpty(registration.barangay)) {
        alert("Barangay is required");
        return false;
      };
      if (validator.isEmpty(registration.zipcode, {ignore_whitespace: true})) {
        alert("Zip code is required");
        return false;
      };
      if (!validator.isNumeric(registration.zipcode) || registration.zipcode.length !== 4) {
        alert("Invalid zipcode");
        return false;   
      };
    return true;
    }
    else if (currentStep === 2 || currentStep === 7)  {
      if (validator.isEmpty(registration.school, {ignore_whitespace: true})) {
        alert("School name is required");
        return false;
      };
      if (validator.isEmpty(registration.course, {ignore_whitespace: true})) {
        alert("Course is required");
        return false;
      };
      if (validator.isEmpty(registration.yeargrad)) {
        alert("Year graduate is required");
        return false;
      };
      if (validator.isEmpty(registration.occupation, {ignore_whitespace: true})) {
        alert("Occupation is required");
        return false;
      };
      if (validator.isEmpty(registration.company, {ignore_whitespace: true})) {
        alert("Company name is required");
        return false;
      };
      return true;
    }
    else if (currentStep === 3 || currentStep === 7)  {
      if (validator.isEmpty(registration.fgcivilstatus)) {
        alert("Civil status is required");
        return false;
      };
      if (validator.isEmpty(registration.fgname, {ignore_whitespace: true})) {
        alert("Spouse's / Guardian's Name is required");
        return false;
      };
      if (validator.isEmpty(registration.fgaddress, {ignore_whitespace: true})) {
        alert("Address is required");
        return false;
      };
      if (validator.isEmpty(registration.fgregion)) {
        alert("Region is required");
        return false;
      };
      if (validator.isEmpty(registration.fgprovince)) {
        alert("Province is required");
        return false;
      };
      if (validator.isEmpty(registration.fgcity)) {
        alert("City is required");
        return false;
      };
      if (validator.isEmpty(registration.fgbarangay)) {
        alert("Barangay is required");
        return false;
      };
      if (validator.isEmpty(registration.fgcontactnum, {ignore_whitespace: true})) {
        alert("Contact number is required");
        return false;
      };
      if (!validator.isNumeric(registration.fgcontactnum)|| registration.fgcontactnum.length !== 11 || !registration.fgcontactnum.startsWith("09") ) { 
        alert("Invalid contact number");
        return false;   
      };
      if (validator.isEmpty(registration.fgzipcode, {ignore_whitespace: true})) {
        alert("Zip code is required");
        return false;
      };
      if (!validator.isNumeric(registration.fgzipcode) || registration.fgzipcode.length !== 4) {
        alert("Invalid contact number");
        return false;   
      };
      return true;
    }
    else if (currentStep === 4 || currentStep === 7)  {
      if (validator.isEmpty(registration.selectedprog)) {
        alert("Program is required");
        return false;
      };
      return true;

    } else if (currentStep === 5 || currentStep === 7)  {
      if (registration.attachedfiles.length === 0) {
        alert("Attached files is required");
        return false;
      };
      return true;
    }
    else if (currentStep === 6)  {
      if (registration.checked1 === false) {
        alert("Enrollment policy is required");
        return false;
      }
      else if (registration.checked2 === false) {
        alert("Terms and conditions is required");
        return false;
      }
      return true;
    }
  }
  
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
      case 7:
        return <Step7 />;
      case 8:
        return <SuccessPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-16">
      <div className="mb-6">
        <img src="/images/ascend_logo.png" alt="Ascend Logo" className="h-14" />
        {currentStep < 8 && (
        <div className="flex mt-2 ml-10 md:ml-20">
          <GoArrowLeft
            className="text-2xl cursor-pointer"
            onClick={() => router.visit('/')}
          />
        </div>
        )}
      </div>
      
      {currentStep < 8 && (
      <div className="text-center text-size6 font-semibold text-black mb-10">Enrollment Form</div>
      )}

      {currentStep < 8 && (
        <div className="text-center">
          <div className="flex justify-center items-center space-x-0 mb-6 sm:mb-0 mb-adjust-below-945">
            
            <div className={`w-12 h-12 border-4 ${currentStep >= 1 ? 'border-ascend-blue' : 'border-ascend-gray2'} ${currentStep > 1 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0 `}>
              <div className={`${currentStep == 1 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
              {currentStep > 1 && <GoCheck className="text-white text-size4 font-bold" />}
              </div>
            </div>
            <div className={`h-1 w-24 ${currentStep > 1 ? 'bg-ascend-blue' : 'bg-ascend-gray2'}`}></div>

            <div className={`w-12 h-12 border-4 ${currentStep >= 2 ? 'border-ascend-blue' : 'border-ascend-gray2'} ${currentStep > 2 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0`}>
              <div className={`${currentStep == 2 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
              {currentStep > 2 && <GoCheck className="text-white text-size4 font-bold" />}
              </div>
            </div>
            <div className={`h-1 w-24 ${currentStep > 2 ? 'bg-ascend-blue' : 'bg-ascend-gray2'}`}></div>

            <div className={`w-12 h-12 border-4 ${currentStep >= 3 ? 'border-ascend-blue' : 'border-ascend-gray2'} ${currentStep > 3 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0`}>
              <div className={`${currentStep == 3 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
              {currentStep > 3 && <GoCheck className="text-white text-size4 font-bold" />}
              </div>
            </div>
            <div className={`h-1 w-24 ${currentStep > 3 ? 'bg-ascend-blue' : 'bg-ascend-gray2'}`}></div>

            <div className={`w-12 h-12 border-4 ${currentStep >= 4 ? 'border-ascend-blue' : 'border-ascend-gray2'} ${currentStep > 4 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0`}>
              <div className={`${currentStep == 4 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
              {currentStep > 4 && <GoCheck className="text-white text-size4 font-bold" />}
              </div>
            </div>
            <div className={`h-1 w-24 ${currentStep > 4 ? 'bg-ascend-blue' : 'bg-ascend-gray2'}`}></div>

            <div className={`w-12 h-12 border-4 ${currentStep >= 5 ? 'border-ascend-blue' : 'border-ascend-gray2'} ${currentStep > 5 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0`}>
              <div className={`${currentStep == 5 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
              {currentStep > 5 && <GoCheck className="text-white text-size4 font-bold" />}
              </div>
            </div>
            <div className={`h-1 w-24 ${currentStep > 5 ? 'bg-ascend-blue' : 'bg-ascend-gray2'}`}></div>

            <div className={`w-12 h-12 border-4 ${currentStep >= 6 ? 'border-ascend-blue' : 'border-ascend-gray2'} ${currentStep > 6 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0`}>
              <div className={`${currentStep == 6 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
              {currentStep > 6 && <GoCheck className="text-white text-size4 font-bold" />}
              </div>
            </div>
            <div className={`h-1 w-24 ${currentStep > 6 ? 'bg-ascend-blue' : 'bg-ascend-gray2'}`}></div>

            <div className={`w-12 h-12 border-4 ${currentStep >= 7 ? 'border-ascend-blue' : 'border-ascend-gray2'} ${currentStep > 7 ? 'bg-ascend-blue' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0`}>
              <div className={`${currentStep == 7 ? 'w-3 h-3 bg-ascend-blue rounded-full' : ''}`}> 
              {currentStep > 7 && <GoCheck className="text-white text-size4 font-bold" />}
              </div>
            </div>

          </div>

          <div className="hide-step-below-945 flex justify-center items-center space-x-6 mb-10">
            <div className={`text-size2 font-semibold ml-6 mr-13 ${currentStep >= 1 ? 'text-ascend-blue' : 'text-ascend-gray2'}`}>Personal &<br />Contact<br />Information</div>
            <div className={`text-size2 font-semibold ml-1 mr-5 ${currentStep >= 2 ? 'text-ascend-blue' : 'text-ascend-gray2'}`}>Education &<br />Employment<br />&nbsp;</div>
            <div className={`text-size2 font-semibold ml-8 mr-10 ${currentStep >= 3 ? 'text-ascend-blue' : 'text-ascend-gray2'}`}>Family/<br />Guardian<br />Information</div>
            <div className={`text-size2 font-semibold ml-7 mr-10 ${currentStep >= 4 ? 'text-ascend-blue' : 'text-ascend-gray2'}`}>Select<br />Program<br />&nbsp;</div>
            <div className={`text-size2 font-semibold ml-7 mr-10 ${currentStep >= 5 ? 'text-ascend-blue' : 'text-ascend-gray2'}`}>Additional<br />Requirements<br />&nbsp;</div>
            <div className={`text-size2 font-semibold ml-3 mr-10 ${currentStep >= 6 ? 'text-ascend-blue' : 'text-ascend-gray2'}`}>Terms <br />and<br />Conditions</div>
            <div className={`text-size2 font-semibold ml-9 mr-10 ${currentStep >= 7 ? 'text-ascend-blue' : 'text-ascend-gray2'}`}>Review<br />&nbsp;<br />&nbsp;</div>
          </div>
            
        </div>
      )}


    <form className="space-y-4">
        {showStep()}
    </form>

    <div className="w-full max-w-4xl mx-auto flex space-x-4 justify-end mt-4">

      {currentStep > 1 && currentStep < 8 && (
      <PrimaryButton 
        doSomething={() => setCurrentStep((prev) => Math.min(prev - 1, 8))}
        text = "Back"
      />
      )}
      
      {currentStep < 7 && (  
        <PrimaryButton
          type="button"
          doSomething={() => {if (handleValidation()) {setCurrentStep((prev) => Math.min(prev + 1, 8)); }}}
          text="Next Step"  
        />
      )}


      {currentStep === 7 && (
        <PrimaryButton
        type="button"
        doSomething={() => {if (handleValidation()) {handleAdd(); setCurrentStep((prev) => Math.min(prev + 1, 8))}}}
        text ="Save"
      >
      </PrimaryButton>
      )}


    </div>
    </div>
  );
}

export default Registration;
Registration.layout = null;
