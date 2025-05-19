import React from 'react'
import useRegistrationStore from "../../Stores/Registration/registrationStore";

export const Step2 = ({ noBorder = false, edit = false}) => {
      
const registration = useRegistrationStore((state) => state.registration);
    console.log("Render Registration Step 2");
    const handleRegistrationChange = useRegistrationStore(
      (state) => state.handleRegistrationChange
  );

  return (
    <div className={`${noBorder ? '' : 'mx-auto max-w-4xl border-[2px] border-ascend-gray1 bg-white p-10 shadow-lg'}`}>
        <h3 className="text-size4 mb-4 font-nunito-sans font-bold text-left text-black">Education & Employment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 col-span-12">
                <label className="mb-1 block font-nunito-sans">School<span className="text-red-500">*</span></label>
                <input type="text" disabled={edit} value={registration.school} onChange={(e) => handleRegistrationChange("school", e.target.value)} placeholder="School name" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue " ${edit ? 'text-ascend-gray1' : ''}`}/>
            </div>
            <div className="sm:col-span-4 col-span-12">
                <label className="mb-1 block font-nunito-sans">Course<span className="text-red-500">*</span></label>
                <input type="text" disabled={edit} value={registration.course} onChange={(e) => handleRegistrationChange("course", e.target.value)} placeholder="Course or Program" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue " ${edit ? 'text-ascend-gray1' : ''}`}/>
            </div>
        </div>
        <div className="pt-4 flex flex-cols-1 gap-4">
            <div className="sm:w-[32%] w-full">
                <label className="mb-1 block font-nunito-sans">Year Graduate<span className="text-red-500">*</span></label>
                <select disabled={edit} value={registration.yeargrad} onChange={(e) => handleRegistrationChange("yeargrad", e.target.value)} 
                className={`textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue ${edit ? ' text-gray-500' : ''}`}>
                <option value = "">Select year</option>
                {Array.from({ length: 50 }, (_, i) => (
                    <option key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                    </option>
                ))}
                </select> 
            </div>
        </div>
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-4 col-span-12">
                <label className="mb-1 block font-nunito-sans">Occupation<span className="text-red-500">*</span></label>
                <input type="text" disabled={edit} value={registration.occupation} onChange={(e) => handleRegistrationChange("occupation", e.target.value)} placeholder="Job title" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue " ${edit ? 'text-ascend-gray1' : ''}`}/>
            </div>
            <div className="sm:col-span-8 col-span-12">
                <label className="mb-1 block font-nunito-sans">Company<span className="text-red-500">*</span></label>
                <input type="text" disabled={edit} value={registration.company} onChange={(e) => handleRegistrationChange("company", e.target.value)} placeholder="Company name" className={`w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue " ${edit ? 'text-ascend-gray1' : ''}`}/>
            </div>
        </div>
    </div>
  )
}
export default Step2;