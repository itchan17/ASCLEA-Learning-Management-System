import React from 'react'
import {regions, provinces, cities, barangays} from 'select-philippines-address';
import {useEffect, useState} from "react";
import { FaCity } from 'react-icons/fa';    
import useRegistrationStore from "../../Stores/Registration/registrationStore";

export const Step3 = ({ noBorder = false, edit = false }) => {
    console.log("Render Registration Step 3");

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
        <h3 className="text-size4 mb-4 font-nunito-sans font-bold text-left text-black">Family / Guardian Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-4 col-span-12">
                <label className="mb-1 block font-nunito-sans">Civil Status<span className="text-red-500">*</span></label>
                <select disabled={edit} value={registration.fgcivilstatus} onChange={(e) => handleRegistrationChange("fgcivilstatus", e.target.value)} 
                className={`textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue ${edit ? ' text-gray-500' : ''}`}>
                <option value = "">Select Status </option>
                <option value = "Single">Single</option>
                <option value = "Married">Married</option>
                <option value = "Widowed">Widowed</option>
                <option value = "Separated">Legally Separated</option>
                </select>
            </div>
            <div className="sm:col-span-8 col-span-12">
                <label className="mb-1 block font-nunito-sans">Spouse's / Guardian's Name <span className="text-red-500">*</span></label>
                <input type="text"disabled={edit} value={registration.fgname} onChange={(e) => handleRegistrationChange("fgname", e.target.value)} placeholder="Full name" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue   ${edit ? 'text-ascend-gray1' : ''}`}/>
            </div>
        </div>
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8 col-span-12">
                <label className="mb-1 block font-nunito-sans">Address<span className="text-red-500">*</span></label>
                <input type = "text" disabled={edit} value={registration.fgaddress} onChange={(e) => handleRegistrationChange("fgaddress", e.target.value)} placeholder="House no., Street" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue   ${edit ? 'text-ascend-gray1' : ''}`}/>
            </div>
            <div className="sm:col-span-4 col-span-12">
                <label className="mb-1 block font-nunito-sans">Region <span className="text-red-500">*</span></label>
                <select type="text" disabled={edit} onChange={(e) => {province(e); handleRegistrationChange("fgregion", e.target.value)}} 
                className={`textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue ${edit ? ' text-gray-500' : ''}`}>
                <option value = "">Select region </option>
                {
                    regionData && regionData.length > 0 && regionData.map((item) => <option
                    key={item.region_code} value={item.region_code}>{item.region_name}</option>)
                }
                </select>
            </div>
        </div>
        <div className="pt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
                <label className="mb-1 block font-nunito-sans">Province <span className="text-red-500">*</span></label>
                <select type="text" disabled={edit} onChange={(e) => {city(e); handleRegistrationChange("fgprovince", e.target.value)}} 
                className={`textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue ${edit ? ' text-gray-500' : ''}`}>
                <option value = "">Select province </option>
                {
                    provinceData && provinceData.length > 0 && provinceData.map((item) => <option
                    key={item.province_code} value={item.province_code}>{item.province_name}</option>)
                }
                </select>
            </div>
            <div>
                <label className="mb-1 block font-nunito-sans">City <span className="text-red-500">*</span></label>
                <select type="text" disabled={edit} onChange={(e) => {barangay(e); handleRegistrationChange("fgcity", e.target.value)}} 
                className={`textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue ${edit ? ' text-gray-500' : ''}`}>
                <option value = "">Select city </option>
                {
                cityData && cityData.length > 0 && cityData.map((item) => <option
                  key={item.city_code} value={item.city_code}>{item.city_name}</option>)
                }
                </select>
            </div>
            <div>
                <label className="mb-1 block font-nunito-sans">Barangay <span className="text-red-500">*</span></label>
                <select type="text" disabled={edit} onChange={(e) => {brgy(e); handleRegistrationChange("fgbarangay", e.target.value)}} 
                className={`textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue ${edit ? ' text-gray-500' : ''}`}>
                <option value = "">Select barangay </option>
                {
                barangayData && barangayData.length > 0 && barangayData.map((item) => <option
                  key={item.brgy_code} value={item.brgy_code}>{item.brgy_name}</option>)
                }
                </select>
            </div>
        </div>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="w-full">
                <label className="mb-1 block font-nunito-sans">Contact Number<span className="text-red-500">*</span></label>
                <input type="text" disabled={edit} value={registration.fgcontactnum} onChange={(e) => handleRegistrationChange("fgcontactnum", e.target.value)} placeholder="09XXXXXXXXX" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue   ${edit ? 'text-ascend-gray1' : ''}`}/>
            </div>
            <div className="w-full">
                <label className="mb-1 block font-nunito-sans">Zip Code<span className="text-red-500">*</span></label>
                <input type="text" disabled={edit} value={registration.fgzipcode} onChange={(e) => handleRegistrationChange("fgzipcode", e.target.value)} placeholder="4-digit-ZIP code" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue   ${edit ? 'text-ascend-gray1' : ''}`}/>
            </div>
        </div>
    </div>
  )
}

export default Step3;