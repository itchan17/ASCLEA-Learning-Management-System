import React from 'react'

export const Step2 = ({ noBorder = false }) => {
  return (
    <div className={`${noBorder ? '' : 'mx-auto max-w-4xl border-[2px] border-[#8A8989] bg-white p-6 shadow-lg'}`}>
        <h3 className="text-size4 mb-4 font-semibold text-left text-black">Education & Employment</h3>
        <div className="flex flex-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:w-[65%]">
                <label className="mb-1 block font-medium">School<span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none" />
            </div>
            <div className="sm:w-[35%]">
                <label className="mb-1 block font-medium">Course<span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none" />
            </div>
        </div>
        <div className="pt-4 flex flex-cols-1 gap-4">
            <div className="sm:w-[35%]">
                <label className="mb-1 block font-medium">Year Graduate<span className="text-red-500">*</span></label>
                <select className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none">
                <option>Select year</option>
                </select> 
            </div>
        </div>
            <div className="pt-4 flex flex-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:w-[35%]">
                  <label className="mb-1 block font-medium">Occupation<span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border border-[#8A8989] px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none" />
                </div>
                <div className="sm:w-[65%]">
                    <label className="mb-1 block font-medium">Company<span className="text-red-500">*</span></label>
                    <input type="text" className="w-full border border-[#8A8989]px-3 py-2 text-sm focus:border-[#01007D] focus:outline-none" />
                </div>
            </div>
    </div>
  )
}
export default Step2;