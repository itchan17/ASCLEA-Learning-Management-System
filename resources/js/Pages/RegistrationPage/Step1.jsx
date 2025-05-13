import React from 'react'
import {regions, provinces, cities, barangays} from 'select-philippines-address';
import {useEffect, useState} from "react";
import { FaCity } from 'react-icons/fa';


export const Step1 = ({ noBorder = false, edit = false }) => {
    const [regionData, setRegion] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);

    const [regionAddr, setRegionAddr] = useState("");
    const [provinceAddr, setProvinceAddr] = useState("");
    const [cityAddr, setCityAddr] = useState("");
    const [barangayAddr, setBarangayAddr] = useState("");

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

      <h3 className="text-size4 mb-4 font-semibold text-left text-black">Personal and Contact Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block font-medium">Last Name<span className="text-red-500">*</span></label>
            <input type="text" disabled={edit} className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue" />
          </div>
          <div>
            <label className="mb-1 block font-medium">First Name<span className="text-red-500">*</span></label>
            <input type="text" disabled={edit} className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue" />
          </div>
          <div>
            <label className="mb-1 block font-medium">Middle Name</label>
            <input type="text" disabled={edit} placeholder="Optional" className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue" />
          </div>
        </div>
      
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
          <div>
            <label className="mb-1 block font-medium">Birthday<span className="text-red-500">*</span></label>
            <input type="date" disabled={edit} className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue" />
          </div>
          <div>
            <label className="mb-1 block font-medium">Sex<span className="text-red-500">*</span></label>
            <select disabled={edit} className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue">
              <option disabled selected hidden>
                Select gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium">Contact Number<span className="text-red-500">*</span></label>
            <input type="text" disabled={edit} placeholder="09XX XXX XXXX" className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue" />
          </div>
          <div>
            <label className="mb-1 block font-medium">Email Address<span className="text-red-500">*</span></label>
            <input type="email" disabled={edit} placeholder="name@example.com" className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="sm:w-[65%]">
            <label className="mb-1 block font-medium">Address<span className="text-red-500">*</span></label>
            <input type="text" disabled={edit} placeholder="House no., Street" className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue" />
          </div>
          <div className="sm:w-[35%]">
            <label className="mb-1 block font-medium">Region<span className="text-red-500">*</span></label>
            <select disabled={edit} onChange={province} className=" textField w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue">
              <option disabled selected hidden>Select region</option>
              {
                regionData && regionData.length > 0 && regionData.map((item) => <option
                  key={item.region_code} value={item.region_code}>{item.region_name}</option>)
              }
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-4">
          <div>
            <label className="mb-1 block font-medium">Province<span className="text-red-500">*</span></label>
            <select disabled={edit} onChange={city} className=" textField w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue">
              <option disabled selected hidden>Select province</option>
              {
                provinceData && provinceData.length > 0 && provinceData.map((item) => <option
                  key={item.province_code} value={item.province_code}>{item.province_name}</option>)
              }
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium">City<span className="text-red-500">*</span></label>
            <select disabled={edit} onChange={barangay} className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue">
              <option disabled selected hidden>Select city</option>
              {
                cityData && cityData.length > 0 && cityData.map((item) => <option
                  key={item.city_code} value={item.city_code}>{item.city_name}</option>)
              }
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium">Barangay<span className="text-red-500">*</span></label>
            <select disabled={edit} onChange={brgy} className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue">
              <option disabled selected hidden>Select barangay</option>
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
              <input type="tex" disabled={edit} placeholder="4-digit-ZIP code" className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue" />
            </div>
        </div>
    </div>
  )
}

export default Step1;
