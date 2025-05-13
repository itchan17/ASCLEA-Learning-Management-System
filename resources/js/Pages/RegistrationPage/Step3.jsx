import React from 'react'

export const Step3 = ({ noBorder = false, edit = false }) => {
  return (

    <div className={`${noBorder ? '' : 'mx-auto max-w-4xl border-[2px] border-ascend-gray1 bg-white p-10 shadow-lg'}`}>
        <h3 className="text-size4 mb-4 font-semibold text-left text-black">Family / Guardian Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-4 col-span-12">
                <label className="mb-1 block font-medium">Civil Status<span className="text-red-500">*</span></label>
                <select disabled={edit} className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue">
                <option disabled selected hidden>Select Status </option>
                </select>
            </div>
            <div className="sm:col-span-8 col-span-12">
                <label className="mb-1 block font-medium">Spouse's / Guardian's Name <span className="text-red-500">*</span></label>
                <input type="text"disabled={edit}  placeholder="Full name" className="w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue" />
            </div>
        </div>
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8 col-span-12">
                <label className="mb-1 block font-medium">Address<span className="text-red-500">*</span></label>
                <input type = "text" disabled={edit} placeholder="House no., Street" className="w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue"/>
            </div>
            <div className="sm:col-span-4 col-span-12">
                <label className="mb-1 block font-medium">Barangay <span className="text-red-500">*</span></label>
                <select type="text" disabled={edit} className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue">
                <option disabled selected hidden>Select barangay </option>
                </select>
            </div>
        </div>
        <div className="pt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
                <label className="mb-1 block font-medium">City <span className="text-red-500">*</span></label>
                <select type="text" disabled={edit} className="textField w-full border border-ascend-gray1  px-3 py-2 text-sm focus:outline-ascend-blue">
                <option disabled selected hidden>Select city </option>
                </select>
            </div>
            <div>
                <label className="mb-1 block font-medium">Province <span className="text-red-500">*</span></label>
                <select type="text" disabled={edit} className="textField w-full border border-ascend-gray1  px-3 py-2 text-sm focus:outline-ascend-blue">
                <option disabled selected hidden>Select provice </option>
                </select>
            </div>
            <div>
                <label className="mb-1 block font-medium">Zip code<span className="text-red-500">*</span></label>
                <input type = "text" disabled={edit} placeholder="4-digit-ZIP code" className="w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue"/>
            </div>
        </div>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div className="sm:w-[32%] w-full">
                <label className="mb-1 block font-medium">Contact Number<span className="text-red-500">*</span></label>
                <input type="text" disabled={edit} placeholder="09XX XXX XXXX" className="w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue"/>
            </div>
        </div>
    </div>
  )
}

export default Step3;