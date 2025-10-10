import { useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import SecondaryButton from "../../Components/Button/SecondaryButton";
import BackButton from "../../Components/Button/BackButton";
import { handleClickBackBtn } from "../../Utils/handleClickBackBtn";
import { BiSolidEditAlt } from "react-icons/bi";

export default function Profile() {
    const { props } = usePage();
    const profile = props.profile || {};
    const [isEdit, setIsEdit] = useState(false);

    const { data, setData, processing, put } = useForm({
        phone: profile?.phone || "",
        houseNoSt: profile?.houseNoSt || "",
        province: profile?.province || "",
        city: profile?.city || "",
        barangay: profile?.barangay || "",
    });

    const toggleEdit = () => setIsEdit(!isEdit);
    const handleSave = () => {
        put(route("profile.update"), {
            preserveScroll: true,
            onSuccess: () => setIsEdit(false),
        });
    };

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
                        <PrimaryButton doSomething={handleSave} text={"Save"} disabled={processing} />
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
                            {`${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`}
                        </div>
                    </div>
                    <div className="font-nunito-sans text-size2 ml-5">
                        {profile?.role
                            ? profile?.role.charAt(0).toUpperCase() + profile?.role.slice(1)
                            : ""}
                    </div>
                </div>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={profile?.lastName || ""}
                            disabled
                            className={`border px-3 py-2 ${
                                "text-ascend-gray1"
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={profile?.firstName || ""}
                            disabled
                            className={`border px-3 py-2 ${
                                "text-ascend-gray1"
                            } border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Middle Name
                        </label>
                        <input
                            type="text"
                            value={profile?.middleName || ""}
                            disabled
                            className={`border px-3 py-2 ${
                                "text-ascend-gray1"
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
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
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
                            value={profile?.email || ""}
                            disabled
                            className={`border px-3 py-2 ${
                                "text-ascend-gray1"
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
                            value={profile?.birthday || ""}
                            disabled
                            className="border px-3 py-2 text-ascend-gray1 border-ascend-gray1 focus:outline-ascend-blue"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Gender
                        </label>
                        <input
                            type="text"
                            value={profile?.gender || ""}
                            disabled
                            className="border px-3 py-2 text-ascend-gray1 border-ascend-gray1 focus:outline-ascend-blue"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-5 mt-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            House no. Street
                        </label>
                        <input
                            type="text"
                            value={data.houseNoSt}
                            onChange={(e) => setData("houseNoSt", e.target.value)}
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
                            value={data.province}
                            onChange={(e) => setData("province", e.target.value)}
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
                            value={data.city}
                            onChange={(e) => setData("city", e.target.value)}
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
                            value={data.barangay}
                            onChange={(e) => setData("barangay", e.target.value)}
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
