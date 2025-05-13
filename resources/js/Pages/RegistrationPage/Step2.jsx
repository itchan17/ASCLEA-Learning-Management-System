import React from 'react'

export const Step2 = ({ noBorder = false, edit = false}) => {
  return (
    <div className={`${noBorder ? '' : 'mx-auto max-w-4xl border-[2px] border-ascend-gray1 bg-white p-10 shadow-lg'}`}>
        <h3 className="text-size4 mb-4 font-semibold text-left text-black">Education & Employment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 col-span-12">
                <label className="mb-1 block font-medium">School<span className="text-red-500">*</span></label>
                <input type="text" disabled={edit} placeholder="School name" className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue" />
            </div>
            <div className="sm:col-span-4 col-span-12">
                <label className="mb-1 block font-medium">Course<span className="text-red-500">*</span></label>
                <input type="text" disabled={edit} placeholder="Course or Program" className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue" />
            </div>
        </div>
        <div className="pt-4 flex flex-cols-1 gap-4">
            <div className="sm:w-[32%] w-full">
                <label className="mb-1 block font-medium">Year Graduate<span className="text-red-500">*</span></label>
                <select disabled={edit} className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue">
                <option disabled selected hidden>Select year</option>
                </select> 
            </div>
        </div>
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-4 col-span-12">
                <label className="mb-1 block font-medium">Occupation<span className="text-red-500">*</span></label>
                <input type="text" disabled={edit} placeholder="Job title" className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue" />
            </div>
            <div className="sm:col-span-8 col-span-12">
                <label className="mb-1 block font-medium">Company<span className="text-red-500">*</span></label>
                <input type="text" disabled={edit} placeholder="Company name" className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue" />
            </div>
        </div>
    </div>
  )
}
export default Step2;