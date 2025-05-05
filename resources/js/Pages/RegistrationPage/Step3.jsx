import React from 'react'

export const Step3 = ({ noBorder = false }) => {
  return (

    <div className={`${noBorder ? '' : 'mx-auto max-w-4xl border-[2px] border-[#8A8989] bg-white p-6 shadow-lg'}`}>
        <h3 className="text-size4 mb-4 font-semibold text-left text-black">Family / Guardian Information</h3>
        <div className="flex flex-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:w-[35%]">
                <label className="mb-1 block font-medium">Civil Status<span className="text-red-500">*</span></label>
                <select className="w-full border px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none">
                <options>Select Status </options>
                </select>
            </div>
            <div className="sm:w-[65%]">
                <label className="mb-1 block font-medium">Spouse's / Guardian's Name <span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none" />
            </div>
        </div>
        <div className="pt-4  flex flex-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:w-[65%]">
                <label className="mb-1 block font-medium">Address<span className="text-red-500">*</span></label>
                <input type = "text" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none"/>
            </div>
            <div className="sm:w-[35%]">
                <label className="mb-1 block font-medium">Barangay <span className="text-red-500">*</span></label>
                <select type="text" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none">
                <options>Select Barangay </options>
                </select>
            </div>
        </div>
        <div className="pt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
                <label className="mb-1 block font-medium">City <span className="text-red-500">*</span></label>
                <select type="text" className="w-full border border-[#8A8989]  px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none">
                <options>Select Barangay </options>
                </select>
            </div>
            <div>
                <label className="mb-1 block font-medium">Provice <span className="text-red-500">*</span></label>
                <select type="text" className="w-full border border-[#8A8989]  px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none">
                <options>Select Barangay </options>
                </select>
            </div>
            <div>
                <label className="mb-1 block font-medium">Zip code<span className="text-red-500">*</span></label>
                <input type = "text" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none"/>
            </div>
        </div>

        <div className="pt-4 flex flex-cols-1 gap-4 sm:grid-cols-1">
            <div className="sm:w-[32%]">
                <label className="mb-1 block font-medium">Contact Number<span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none"/>
            </div>
        </div>
    </div>
  )
}

export default Step3;