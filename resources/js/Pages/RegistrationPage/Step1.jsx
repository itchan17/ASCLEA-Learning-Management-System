import React from 'react'

export const Step1 = ({ noBorder = false }) => {
  return (
    
    <div className={`${noBorder ? '' : 'mx-auto max-w-4xl border-[2px] border-[#8A8989] bg-white p-6 shadow-lg'}`}>

      <h3 className="text-size4 mb-4 font-semibold text-left text-black">Personal and Contact Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block font-medium">Last Name<span className="text-red-500">*</span></label>
            <input type="text" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-ascend-blue focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block font-medium">First Name<span className="text-red-500">*</span></label>
            <input type="text" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-ascend-blue focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block font-medium">Middle Name</label>
            <input type="text" placeholder="Optional" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-ascend-blue focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
          <div>
            <label className="mb-1 block font-medium">Birthday<span className="text-red-500">*</span></label>
            <input type="date" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-ascend-blue focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block font-medium">Gender<span className="text-red-500">*</span></label>
            <select className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-ascend-blue focus:outline-none">
              <option>Select gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium">Contact Number<span className="text-red-500">*</span></label>
            <input type="text" placeholder="09XX XXX XXXX" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-ascend-blue focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block font-medium">Email Address<span className="text-red-500">*</span></label>
            <input type="email" placeholder="name@example.com" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-ascend-blue focus:outline-none" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <div className="sm:w-[65%]">
            <label className="mb-1 block font-medium">Address<span className="text-red-500">*</span></label>
            <input type="text" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-ascend-blue focus:outline-none" />
          </div>
          <div className="sm:w-[35%]">
            <label className="mb-1 block font-medium">Barangay<span className="text-red-500">*</span></label>
            <select className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-ascend-blue focus:outline-none">
              <option>Select barangay</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-2">
          <div>
            <label className="mb-1 block font-medium">City<span className="text-red-500">*</span></label>
            <select className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-ascend-blue focus:outline-none">
              <option>Select city</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium">Province<span className="text-red-500">*</span></label>
            <select className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-ascend-blue focus:outline-none">
              <option>Select province</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium">Zip Code<span className="text-red-500">*</span></label>
            <input type="number" placeholder="4-digit-ZIP code" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-ascend-blue focus:outline-none" />
          </div>
        </div>
    </div>
  )
}

export default Step1;
