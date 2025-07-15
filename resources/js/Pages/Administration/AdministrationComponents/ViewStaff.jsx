import { useState, useEffect } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import BackButton from "../../../Components/Button/BackButton";
import { handleClickBackBtn } from "../../../Utils/handleClickBackBtn";
import { BiSolidEditAlt } from "react-icons/bi";
import useAdministrationStore from "../../../Stores/Administration/administrationStore";
import { usePage } from "@inertiajs/react";
import AssignedCourses from "./AssignedCourses";

export default function ViewStaff() {
    const staffList = useAdministrationStore((state) => state.staffList);
    const [isEdit, setIsEdit] = useState(false);
    const [staffDetails, setStaffDetails] = useState(null);

    // get the id from url
    const { userId } = usePage().props;

    const toggleEdit = () => setIsEdit(!isEdit);

    // temporarily get the data of selected staff
    useEffect(() => {
        // check if id is true
        if (userId) {
            // find the assessment details in asssessment list based on the id in url
            // this in temporary only as there's currently data passed from backend
            // the data will come from the backend and here's we're it will be set
            const details = staffList.find(
                (detail) => detail.id === Number(userId)
            );
            console.log(details);
            // set the data
            setStaffDetails(details);
        }
    }, []);

    return (
        <div className="space-y-5 font-nunito-sans">
            <div className="flex flex-wrap items-center justify-between">
                <BackButton doSomething={handleClickBackBtn} />
                <PrimaryButton btnColor={"bg-ascend-red"} text={"Archive"} />
            </div>

            <div className="flex flex-wrap gap-5 items-center justify-between">
                <div className="justify-start flex items-center">
                    <div className="relative w-18 h-18 bg-ascend-gray1 rounded-full shrink-0">
                        <label htmlFor="inputBg">
                            <BiSolidEditAlt className="text-size4 text-ascend-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer" />
                        </label>
                        <input className="hidden" type="file" id="inputBg" />
                    </div>
                    <div className="flex flex-col ml-2">
                        <div className="flex items-center gap-2">
                            <div className="font-nunito-sans text-size4 ml-5 font-bold">
                                {`${staffDetails?.firstName} ${staffDetails?.lastName}`}
                            </div>
                            <div className="bg-ascend-blue text-ascend-white px-5 text-center">
                                Active
                            </div>
                        </div>
                        <div className="font-nunito-sans text-size2 ml-5">
                            {staffDetails?.role
                                ? staffDetails.role.charAt(0).toUpperCase() +
                                  staffDetails.role.slice(1)
                                : ""}
                        </div>
                    </div>
                </div>
                {isEdit ? (
                    <div className="flex gap-2">
                        <SecondaryButton
                            doSomething={toggleEdit}
                            text={"Cancel"}
                        />
                        <PrimaryButton doSomething={toggleEdit} text={"Save"} />
                    </div>
                ) : (
                    <PrimaryButton doSomething={toggleEdit} text={"Edit"} />
                )}
            </div>
            <div className="flex gap-5">
                <h1 className="font-bold">
                    Created on:{" "}
                    <span className="font-normal">April 16, 2025</span>
                </h1>
                <h1 className="font-bold">
                    Created by: <span className="font-normal">Jonh Doe</span>
                </h1>
            </div>

            <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={staffDetails?.lastName || ""}
                            disabled={!isEdit}
                            className={`border px-3 py-2 ${
                                !isEdit ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={staffDetails?.firstName || ""}
                            disabled={!isEdit}
                            className={`border px-3 py-2 ${
                                !isEdit ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Middle Name
                        </label>
                        <input
                            type="text"
                            value={staffDetails?.middleName || ""}
                            disabled={!isEdit}
                            className={`border px-3 py-2 ${
                                !isEdit ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={staffDetails?.phone}
                            disabled={!isEdit}
                            className={`border px-3 py-2 ${
                                !isEdit ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Email
                        </label>
                        <input
                            type="text"
                            value={staffDetails?.email || ""}
                            disabled={!isEdit}
                            className={`border px-3 py-2 ${
                                !isEdit ? "text-ascend-gray1" : ""
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
                            value={staffDetails?.birthday}
                            disabled={!isEdit}
                            className={`border px-3 py-2 ${
                                !isEdit ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Gender
                        </label>
                        <select
                            value={staffDetails?.gender}
                            className={`textField border px-3 py-2  ${
                                !isEdit ? "text-ascend-gray1" : ""
                            }  border-ascend-gray1 focus:outline-ascend-blue`}
                            disabled={!isEdit}
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
                            value={staffDetails?.houseNoSt}
                            disabled={!isEdit}
                            className={`border px-3 py-2 ${
                                !isEdit ? "text-ascend-gray1" : ""
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
                            value={staffDetails?.province}
                            className={`textField border px-3 py-2 ${
                                !isEdit ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                            disabled={!isEdit}
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
                            value={staffDetails?.city}
                            className={`textField border px-3 py-2 ${
                                !isEdit ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                            disabled={!isEdit}
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
                            value={staffDetails?.barangay}
                            className={`textField border px-3 py-2 ${
                                !isEdit ? "text-ascend-gray1" : ""
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                            disabled={!isEdit}
                        >
                            <option value="">Select Barangay</option>
                            <option value="barangay_1">Barangay 1</option>
                        </select>
                    </div>
                </div>
            </form>

            {staffDetails && staffDetails?.role === "faculty" && (
                <AssignedCourses />
            )}
        </div>
    );
}
