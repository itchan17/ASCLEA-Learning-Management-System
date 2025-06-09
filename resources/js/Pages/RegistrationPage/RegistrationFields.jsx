import React from 'react'
import PrimaryButton from "../../Components/Button/PrimaryButton";

const RegistrationFields = () => {
  return (
    <>
    <div className="mx-auto max-w-4xl bg-white">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="relative">
                <input type="text" onChange={(e) => handleRegistrationChange("lastname", e.target.value)} id="LastNameOutlined" class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer" placeholder=" " />
                <label for="LastNameOutlined" class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Last Name <span className="text-ascend-red">*</span></label>
            </div>
            <div class="relative">
                <input type="text" onChange={(e) => handleRegistrationChange("firstname", e.target.value)} id="FirstNameOutlined" class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer" placeholder=" " />
                <label for="FirstNameOutlined" class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">First Name <span className="text-ascend-red">*</span></label>
            </div>
            <div class="relative">
                <input type="text" onChange={(e) => handleRegistrationChange("middlename", e.target.value)} id="MiddleNameOutlined" class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer" placeholder=" " />
                <label for="MiddleNameOutlined" class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Middle Name <span className="text-ascend-red">*</span></label>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
          <div>
            <input type="date" onChange={(e) => handleRegistrationChange("birthday", e.target.value)} className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue"/>
          </div>
          <div>
            <select onChange={(e) => handleRegistrationChange("sex", e.target.value)} className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue">
              <option value = "">
                Select sex <span className="text-ascend-red">*</span>
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
       </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 pt-4">
            <div class="relative">
                <input type="text" onChange={(e) => handleRegistrationChange("HouseStreet", e.target.value)} id="HouseStreetOutlined" class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer" placeholder=" " />
                <label for="HouseStreetOutlined" class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">House no., Street <span className="text-ascend-red">*</span></label>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-4">

              <select onChange={(e) => handleRegistrationChange("province", e.target.value)} className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue">
                <option value = "">
                  Province <span className="text-ascend-red">*</span>
                </option>
                <option>None</option>
                <option>None</option>
              </select>

              <select onChange={(e) => handleRegistrationChange("city", e.target.value)} className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue">
                <option value = "">
                  City <span className="text-ascend-red">*</span>
                </option>
                <option>None</option>
                <option>None</option>
              </select>

              <select onChange={(e) => handleRegistrationChange("barangay", e.target.value)} className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue">
                <option value = "">
                  Barangay <span className="text-ascend-red">*</span>
                </option>
                <option>None</option>
                <option>None</option>
              </select>
          </div>
        
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
                <div class="relative">
                    <input type="text" onChange={(e) => handleRegistrationChange("lastname", e.target.value)} id="ContactOutlined" class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer" placeholder=" " />
                    <label for="ContactOutlined" class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Contact Number</label>
                </div>
                <div class="relative">
                    <input type="text" onChange={(e) => handleRegistrationChange("firstname", e.target.value)} id="EmailAddressOutlined" class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer" placeholder=" " />
                    <label for="EmailAddressOutlined" class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email Address <span className="text-ascend-red">*</span></label>
                </div>
            </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 pt-4">
            <select onChange={(e) => handleRegistrationChange("prgogram", e.target.value)} className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue">
                <option value = "">
                  Program <span className="text-ascend-red">*</span>
                </option>
                <option>LET</option>
                <option>CPT</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
            <div class="relative">
                <input type="password" onChange={(e) => handleRegistrationChange("password", e.target.value)} id="PasswordOutlined" class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer" placeholder=" " />
                <label for="PasswordOutlined" class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password <span className="text-ascend-red">*</span></label>
            </div>
            <div class="relative">
                <input type="password" onChange={(e) => handleRegistrationChange("confirmpassword", e.target.value)} id="CPasswordOutlined" class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer" placeholder=" " />
                <label for="CPasswordOutlined" class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm Password <span className="text-ascend-red">*</span></label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4">
            <PrimaryButton
              text="Register"
              />
          </div>

        </div>
    </>
  )
}

export default RegistrationFields
