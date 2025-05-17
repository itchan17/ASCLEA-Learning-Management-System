import React from "react";
import { IoSearch } from "react-icons/io5";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../Components/Button/PrimaryButton";

export default function AddStudentForm() {
    return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
            <form className="bg-ascend-white opacity-100 p-5 w-120 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10">
                <h1 className="text-size4 font-bold">Add Student</h1>

                <div className="relative">
                    <input
                        className="border h-9 w-full pl-10 p-2 border-ascend-black focus:outline-ascend-blue"
                        type="text"
                        placeholder="Search by typing name or email"
                    />
                    <IoSearch className="absolute text-size4 left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>

                <div className="flex justify-end space-x-2">
                    <SecondaryButton text={"Cancel"} />
                    <PrimaryButton btnType={"submit"} text={"Add"} />
                </div>
            </form>
        </div>
    );
}
