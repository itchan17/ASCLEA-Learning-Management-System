import { useState } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import SecondaryButton from "../../Components/Button/SecondaryButton";
import BackButton from "../../Components/Button/BackButton";
import { handleClickBackBtn } from "../../Utils/handleClickBackBtn";
import { BiSolidEditAlt } from "react-icons/bi";
import useUserStore from "../../Stores/User/userStore";

export default function Profile() {
    const user = useUserStore((state) => state.user);
    const [isEdit, setIsEdit] = useState(false);

    const toggleEdit = () => setIsEdit(!isEdit);

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between">
                <BackButton doSomething={handleClickBackBtn} />

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

            <div className="justify-start flex items-center mt-5">
                <div className="relative w-18 h-18 bg-ascend-gray1 rounded-full">
                    <label htmlFor="inputBg">
                        <BiSolidEditAlt className="text-size4 text-ascend-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer" />
                    </label>
                    <input className="hidden" type="file" id="inputBg" />
                </div>
                <div className="flex flex-col ml-2">
                    <div className="flex items-center">
                        <div className="font-nunito-sans text-size4 ml-5 font-bold">
                            {`${user?.firstName} ${user?.lastName}`}
                        </div>
                    </div>
                    <div className="font-nunito-sans text-size2 ml-5">
                        {user?.role.charAt(0).toUpperCase() +
                            user?.role.slice(1)}
                    </div>
                </div>
            </div>

            <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={user?.lastName}
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
                            value={user?.firstName}
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
                            value={user?.middleName}
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
                            value={user?.phone}
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
                            value={user?.email}
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
                            value={user?.birthday}
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
                            value={user?.gender}
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
                            value={user?.houseNoSt}
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
                            value={user?.province}
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
                            value={user?.city}
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
                            value={user?.barangay}
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
        </div>
    );
}
