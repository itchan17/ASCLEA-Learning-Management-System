import React from "react";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../Components/Button/PrimaryButton";

export default function AddStaffForm({ toggleForm }) {
    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center font-nunito-sans ">
            <form className="bg-ascend-white opacity-100 p-5 w-112 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10">
                <h1 className="text-size4 font-bold">Create Staff Account</h1>

                <div className="flex flex-col">
                    <label className="text-size2 text-ascend-black">
                        First Name
                        <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        type="text"
                        className="border px-3 py-2  border-ascend-gray1 focus:outline-ascend-blue"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-size2 text-ascend-black">
                        Last Name
                        <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        type="text"
                        className="border px-3 py-2  border-ascend-gray1 focus:outline-ascend-blue"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-size2 text-ascend-black">
                        Middle Name
                        <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        type="text"
                        className="border px-3 py-2  border-ascend-gray1 focus:outline-ascend-blue"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-size2 text-ascend-black">
                        Email
                        <span className="text-ascend-red">*</span>
                    </label>
                    <input
                        type="email"
                        className="border px-3 py-2  border-ascend-gray1 focus:outline-ascend-blue"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-nunito-sans text-size2 text-ascend-black">
                        Role
                        <span className="text-ascend-red">*</span>
                    </label>
                    <select className="textField border px-3 py-2  border-ascend-gray1 focus:outline-ascend-blue">
                        <option value="">Select Role</option>
                        <option value="metro_manila">Administrator</option>
                        <option value="metro_manila">Faculty</option>
                    </select>
                </div>

                <div className="flex justify-end gap-2">
                    <SecondaryButton text={"Cancel"} doSomething={toggleForm} />
                    <PrimaryButton text={"Create"} doSomething={toggleForm} />
                </div>
            </form>
        </div>
    );
}
