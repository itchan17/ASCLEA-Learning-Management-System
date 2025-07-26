import React from "react";
import { useState } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";

const DataFormFields = ({ student, isEditDisabled, setIsEditDisabled }) => {
    return (
        <>
            <div className="flex justify-end items-center">
                {isEditDisabled ? (
                    <PrimaryButton
                        text="Edit"
                        btnColor="bg-ascend-blue"
                        doSomething={() => setIsEditDisabled(false)}
                    />
                ) : (
                    <div className="flex gap-3">
                        <SecondaryButton
                            text="Cancel"
                            btnColor="bg-ascend-red"
                            doSomething={() => setIsEditDisabled(true)}
                        />

                        <PrimaryButton
                            text="Save"
                            btnColor="bg-ascend-blue"
                            doSomething={() => setIsEditDisabled(true)}
                        />
                    </div>
                )}
            </div>

            <form autoComplete="off">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Last Name
                        </label>
                        <input
                            type="text"
                            disabled={isEditDisabled}
                            value={student.last_name}
                            className={`border px-3 py-2 ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            First Name
                        </label>
                        <input
                            type="text"
                            disabled={isEditDisabled}
                            value={student.first_name}
                            className={`border px-3 py-2 ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Middle Name
                        </label>
                        <input
                            type="text"
                            disabled={isEditDisabled}
                            value={student.middle_name}
                            className={`border px-3 py-2 ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Program
                        </label>
                        <select
                            className={`textField border px-3 py-2 ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                            value={student.program}
                            disabled={isEditDisabled}
                        >
                            <option value="">Select Program</option>
                            <option value="program1">Program 1</option>
                            <option value="program2">Program 2</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Status
                        </label>
                        <select
                            className={`textField border px-3 py-2 ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                            value={student.status}
                            disabled={isEditDisabled}
                        >
                            <option value="">Select Status</option>
                            <option value="enrolled">Enrolled</option>
                            <option value="dropped">Drop</option>
                            <option value="withdraw">withdraw</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={student.phone}
                            disabled={isEditDisabled}
                            className={`border px-3 py-2 ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Email
                        </label>
                        <input
                            type="text"
                            value={student.email}
                            disabled={isEditDisabled}
                            className={`border px-3 py-2 ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Birthday
                        </label>
                        <input
                            type="date"
                            value={student.birthday}
                            disabled={isEditDisabled}
                            className={`border px-3 py-2 ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Gender
                        </label>
                        <select
                            className={`textField border px-3 py-2  ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            }  border-ascend-gray1 focus:outline-ascend-blue`}
                            value={student.gender}
                            disabled={isEditDisabled}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-5 mt-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            House no. Street
                        </label>
                        <input
                            type="text"
                            value={student.house_no_st}
                            disabled={isEditDisabled}
                            className={`border px-3 py-2 ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Province
                        </label>
                        <select
                            className={`textField border px-3 py-2 ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                            value={student.province}
                            disabled={isEditDisabled}
                        >
                            <option value="">Select Province</option>
                            <option value="metro_manila">Metro Manila</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            City
                        </label>
                        <select
                            className={`textField border px-3 py-2 ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                            value={student.city}
                            disabled={isEditDisabled}
                        >
                            <option value="">Select City</option>
                            <option value="quezon_city">Quezon City</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Barangay
                        </label>
                        <select
                            className={`textField border px-3 py-2 ${
                                isEditDisabled ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                            value={student.barangay}
                            disabled={isEditDisabled}
                        >
                            <option value="">Select Barangay</option>
                            <option value="barangay_1">Barangay 1</option>
                        </select>
                    </div>
                </div>
            </form>
        </>
    );
};

export default DataFormFields;
