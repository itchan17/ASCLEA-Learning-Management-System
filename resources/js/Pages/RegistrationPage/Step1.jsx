import React from 'react'
import {regions, provinces, cities, barangays} from 'select-philippines-address';
import {useEffect, useState} from "react";
import useRegistrationStore from "../../Stores/Registration/registrationStore";
import validator from "validator";

export const Step1 = ({ noBorder = false, edit = false, validatedStep = false }) => {
    console.log("Render Registration Step 1");

    const [regionData, setRegion] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);

    const [regionAddr, setRegionAddr] = useState("");
    const [provinceAddr, setProvinceAddr] = useState("");
    const [cityAddr, setCityAddr] = useState("");
    const [barangayAddr, setBarangayAddr] = useState("");

  const registration = useRegistrationStore((state) => state.registration);
    const handleRegistrationChange = useRegistrationStore(
      (state) => state.handleRegistrationChange
  );

    const region = () => {
        regions().then(response => {
            setRegion(response);
        });
    }

    const province = (e) => {
        setRegionAddr(e.target.selectedOptions[0].text);
        provinces(e.target.value).then(response => {
            setProvince(response);
            setCity([]);
            setBarangay([]);
        });
    }

    const city = (e) => {
        setProvinceAddr(e.target.selectedOptions[0].text);
        cities(e.target.value).then(response => {
            setCity(response);
        });
    }

    const barangay = (e) => {
        setCityAddr(e.target.selectedOptions[0].text);
        barangays(e.target.value).then(response => {
            setBarangay(response);
        });
    }

    const brgy = (e) => {
        setBarangayAddr(e.target.selectedOptions[0].text);
    }

    useEffect(() => {
        region()
    }, [])
    
  return (
    
    <div className={`${noBorder ? '' : 'mx-auto max-w-4xl border-[2px] border-ascend-gray1 bg-white p-10 shadow-lg'}`}>

      <h3 className="text-size4 mb-4 font-nunito-sans font-bold text-left text-black">Personal and Contact Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block font-nunito-sans">Last Name<span className="text-red-500">*</span></label>
            <input type="text" disabled={edit} value={registration.lastname} onChange={(e) => handleRegistrationChange("lastname", e.target.value)} className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue " ${edit ? 'text-ascend-gray1' : ''}`} />
          </div>
          <div>
            <label className="mb-1 block font-nunito-sans">First Name<span className="text-red-500">*</span></label>
            <input type="text" disabled={edit} value={registration.firstname} onChange={(e) => handleRegistrationChange("firstname", e.target.value)} className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue   ${edit ? 'text-ascend-gray1' : ''}`}/>
          </div>
          <div>
            <label className="mb-1 block font-nunito-sans">Middle Name</label>
            <input type="text" disabled={edit} value={registration.middlename} onChange={(e) => handleRegistrationChange("middlename", e.target.value)} placeholder="Optional" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue   ${edit ? 'text-ascend-gray1' : ''}`}/>
          </div>
        </div>
      
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
          <div>
            <label className="mb-1 block font-nunito-sans">Birthday<span className="text-red-500">*</span></label>
            <input type="date" disabled={edit} value={registration.birthday} onChange={(e) => handleRegistrationChange("birthday", e.target.value)} className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue   ${edit ? 'text-ascend-gray1' : ''}`}/>
          </div>
          <div>
            <label className="mb-1 block font-nunito-sans">Sex<span className="text-red-500">*</span></label>
            <select disabled={edit} value={registration.sex} onChange={(e) => handleRegistrationChange("sex", e.target.value)} className={`textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue 
    ${edit ? ' text-gray-500' : ''}`}>
              <option value = "">
                Select sex
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block font-nunito-sans">Contact Number<span className="text-red-500">*</span></label>
            <input type="text" disabled={edit} value={registration.contactnumber} onChange={(e) => handleRegistrationChange("contactnumber", e.target.value)} placeholder="09XXXXXXXXX" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue   ${edit ? 'text-ascend-gray1' : ''}`}/>
          </div>
          <div>
            <label className="mb-1 block font-nunito-sans">Email Address<span className="text-red-500">*</span></label>
            <input type="email" disabled={edit} value={registration.emailaddress} onChange={(e) => handleRegistrationChange("emailaddress", e.target.value)} placeholder="name@example.com" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue   ${edit ? 'text-ascend-gray1' : ''}`}/>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="sm:w-[65%]">
            <label className="mb-1 block font-nunito-sans">Address<span className="text-red-500">*</span></label>
            <input type="text" disabled={edit} value={registration.address} onChange={(e) => handleRegistrationChange("address", e.target.value)} placeholder="House no., Street" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue ${edit ? 'text-ascend-gray1' : ''}`} />
          </div>
          <div className="sm:w-[35%]">
            <label className="mb-1 block font-nunito-sans">Region<span className="text-red-500">*</span></label>
            <select disabled={edit}  onChange={(e) => {province(e); handleRegistrationChange("region", e.target.value); }}   
              className={`textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue ${edit ? ' text-gray-500' : ''}`}>
               <option value = "">Select region</option>
              {
                regionData && regionData.length > 0 && regionData.map((item) => <option
                  key={item.region_code} value={item.region_code}>{item.region_name}</option>)
              }
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-4">
          <div>
            <label className="mb-1 block font-nunito-sans">Province<span className="text-red-500">*</span></label>
            <select disabled={edit}  onChange={(e) => {city(e); handleRegistrationChange("province", e.target.value); }}   
              className={`textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue ${edit ? ' text-gray-500' : ''}`}>
               <option value = "">Select province</option>
              {
                provinceData && provinceData.length > 0 && provinceData.map((item) => <option
                  key={item.province_code} value={item.province_code}>{item.province_name}</option>)
              }
            </select>
          </div>
          <div>
            <label className="mb-1 block font-nunito-sans">City<span className="text-red-500">*</span></label>
            <select disabled={edit}  onChange={(e) => {barangay(e); handleRegistrationChange("city", e.target.value); }} 
            className={`textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue ${edit ? ' text-gray-500' : ''}`}>
               <option value = "">Select province</option>
              <option value = "">Select city</option>
              {
                cityData && cityData.length > 0 && cityData.map((item) => <option
                  key={item.city_code} value={item.city_code}>{item.city_name}</option>)
              }
            </select>
          </div>
          <div>
            <label className="mb-1 block font-nunito-sans-medium">Barangay<span className="text-red-500">*</span></label>
            <select disabled={edit}  onChange={(e) => {brgy(e); handleRegistrationChange("barangay", e.target.value); }} 
            className={`textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue ${edit ? ' text-gray-500' : ''}`}>
               <option value = "">Select province</option>
                <option value = "">Select barangay</option>
              {
                barangayData && barangayData.length > 0 && barangayData.map((item) => <option
                  key={item.brgy_code} value={item.brgy_code}>{item.brgy_name}</option>)
              }
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-4">
            <div>
              <label className="mb-1 block font-medium">Zip Code<span className="text-red-500">*</span></label>
              <input type="tex" disabled={edit}  value = {registration.zipcode} onChange={(e) => handleRegistrationChange("zipcode", e.target.value)} placeholder="4-digit-ZIP code" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue   ${edit ? 'text-ascend-gray1' : ''}`}/>
            </div>
        </div>

        
    </div>
  )
}

export default Step1;


//onChange={(e) => handleRegistrationChange("lastname", validator.trim(e.target.value))} 
