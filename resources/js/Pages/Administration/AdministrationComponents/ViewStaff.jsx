import { useState, useEffect } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import BackButton from "../../../Components/Button/BackButton";
import { handleClickBackBtn } from "../../../Utils/handleClickBackBtn";
import { BiSolidEditAlt } from "react-icons/bi";
import useAdministrationStore from "../../../Stores/Administration/administrationStore";
import { usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { useForm } from "@inertiajs/react";
import AssignedCourses from "./AssignedCourses";
import { regions, provinces, cities, barangays } from "select-philippines-address";
import AlertModal from "../../../Components/AlertModal";
import { displayToast } from "../../../Utils/displayToast";
import DefaultCustomToast from "../../../Components/CustomToast/DefaultCustomToast";

export default function ViewStaff() {
    const route = useRoute();
    const { props } = usePage();
    const { staffDetails } = props; 

    //Updating Staff Information
    const [isEdit, setIsEdit] = useState(false);
    const { data, setData, put, processing, errors, delete: destroy } = useForm({
        first_name: staffDetails?.user?.first_name || "",
        last_name: staffDetails?.user?.last_name || "",
        middle_name: staffDetails?.user?.middle_name || "",
        email: staffDetails?.user?.email || "",
        contact_number: staffDetails?.user?.contact_number || "",
        birthdate: staffDetails?.user?.birthdate || "",
        gender: staffDetails?.user?.gender || "",
        house_no: staffDetails?.user?.house_no || "",
        region: staffDetails?.user?.region || "",
        province: staffDetails?.user?.province || "",
        city: staffDetails?.user?.city || "",
        barangay: staffDetails?.user?.barangay || "",
        region_code: "",
        province_code: "",
        city_code: "",
        barangay_code: "",
        status: staffDetails?.status || "active"
    });

    //Update Handle
    const toggleEdit = () => setIsEdit(!isEdit);
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("staff.update", staffDetails.staff_id), {
            onSuccess: (page) => {
                setIsEdit(false);
                displayToast(
                    <DefaultCustomToast message={page.props.flash.success} />,
                    "success"
                );
            },
        });
    };

    //Archive Information
    const [openAlertModal, setOpenAlertModal] = useState(false);
    const [isArchiveLoading, setIsArchiveLoading] = useState(false);

    const handleArchive = () => {
    setOpenAlertModal(true);
    };

    const confirmArchive = () => {
    setIsArchiveLoading(true);
    destroy(route("staff.destroy", staffDetails.staff_id), {
        onSuccess: (page) => {
            displayToast(
                <DefaultCustomToast message={page.props.flash.success} />,
                "success"
            );
        },
        onFinish: () => {
            setIsArchiveLoading(false);
            setOpenAlertModal(false);
        },
    });
};

    //Functions for Region, Province, City and Barangay
    const [regionList, setRegionList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [barangayList, setBarangayList] = useState([]);

    useEffect(() => {
    let mounted = true;

    async function initLocation() {
        try {
            // Load regions
            const regRes = await regions();
            if (!mounted) return;
            setRegionList(regRes);

            // --- Region ---
            const foundRegion = regRes.find(
                (r) =>
                    r.region_name?.toLowerCase().trim() ===
                    staffDetails?.user?.region?.toLowerCase().trim()
            );
            if (!foundRegion) return;

            setData("region_code", foundRegion.region_code);
            setData("region", foundRegion.region_name);

            // --- Province ---
            const provRes = await provinces(foundRegion.region_code);
            if (!mounted) return;
            setProvinceList(provRes);

            const foundProv = provRes.find(
                (p) =>
                    p.province_name?.toLowerCase().trim() ===
                    staffDetails?.user?.province?.toLowerCase().trim()
            );
            if (!foundProv) return;

            setData("province_code", foundProv.province_code);
            setData("province", foundProv.province_name);

            // --- City ---
            const cityRes = await cities(foundProv.province_code);
            if (!mounted) return;
            setCityList(cityRes);

            const foundCity = cityRes.find(
                (c) =>
                    c.city_name?.toLowerCase().trim() ===
                    staffDetails?.user?.city?.toLowerCase().trim()
            );
            if (!foundCity) return;

            setData("city_code", foundCity.city_code);
            setData("city", foundCity.city_name);

            // --- Barangay ---
            const brgyRes = await barangays(foundCity.city_code);
            if (!mounted) return;
            setBarangayList(brgyRes);

            const foundBrgy = brgyRes.find(
                (b) =>
                    b.brgy_name?.toLowerCase().trim() ===
                    staffDetails?.user?.barangay?.toLowerCase().trim()
            );
            if (!foundBrgy) return;

            setData("barangay_code", foundBrgy.brgy_code);
            setData("barangay", foundBrgy.brgy_name);
        } catch (err) {
            console.error("init location error", err);
        }
    }

    initLocation();

        return () => {
            mounted = false;
        };
    }, [staffDetails, setData]);

    // Handler updates: set both code (for select control) and name (for DB)
    const handleRegionChange = (regionCode) => {
        const selectedRegion = regionList.find((r) => r.region_code === regionCode);
        if (!selectedRegion) return;

        setData("region_code", selectedRegion.region_code);
        setData("region", selectedRegion.region_name);

        // clear dependent selections
        setData("province_code", "");
        setData("province", "");
        setData("city_code", "");
        setData("city", "");
        setData("barangay_code", "");
        setData("barangay", "");
        setProvinceList([]);
        setCityList([]);
        setBarangayList([]);

        provinces(regionCode).then((res) => {
            setProvinceList(res);
        });
    };

    const handleProvinceChange = (provinceCode) => {
        const selectedProvince = provinceList.find((p) => p.province_code === provinceCode);
        if (!selectedProvince) return;

        setData("province_code", selectedProvince.province_code);
        setData("province", selectedProvince.province_name);

        // clear dependent selections
        setData("city_code", "");
        setData("city", "");
        setData("barangay_code", "");
        setData("barangay", "");
        setCityList([]);
        setBarangayList([]);

        cities(provinceCode).then((res) => {
            setCityList(res);
        });
    };

    const handleCityChange = (cityCode) => {
        const selectedCity = cityList.find((c) => c.city_code === cityCode);
        if (!selectedCity) return;

        setData("city_code", selectedCity.city_code);
        setData("city", selectedCity.city_name);

        // clear barangay selection
        setData("barangay_code", "");
        setData("barangay", "");
        setBarangayList([]);

        barangays(cityCode).then((res) => {
            setBarangayList(res);
        });
    };

    const handleBarangayChange = (barangayCode) => {
        const selectedBarangay = barangayList.find((b) => b.brgy_code === barangayCode);
        if (!selectedBarangay) return;

        setData("barangay_code", selectedBarangay.brgy_code);
        setData("barangay", selectedBarangay.brgy_name);
    };

    //=============================================================================================//
    return (
        <div className="space-y-5 font-nunito-sans">
            {/* Alert Modal */}
            {openAlertModal && (
                <AlertModal
                    title={"Archive Confirmation"}
                    description={"Are you sure you want to archive this staff?"}
                    closeModal={() => setOpenAlertModal(false)}
                    onConfirm={confirmArchive}
                    isLoading={isArchiveLoading}
                />
            )}

            <div className="flex flex-wrap items-center justify-between">
                <BackButton doSomething={handleClickBackBtn} />
                <PrimaryButton
                    btnColor={"bg-ascend-red"}
                    text={"Archive"}
                    doSomething={handleArchive}
                />
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
                                {`${staffDetails?.user?.first_name || ""} ${staffDetails?.user?.last_name || ""}`}
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
                        <PrimaryButton 
                        isDisabled={processing}      
                        isLoading={processing} 
                        doSomething={handleSubmit} text={"Save"} />
                    </div>
                ) : (
                    <PrimaryButton doSomething={toggleEdit} text={"Edit"} />
                )}
            </div>
            <div className="flex gap-5">
                <h1 className="font-bold">
                    Created on:{" "}
                    <span className="font-normal">
                        {staffDetails?.created_at
                            ? new Date(staffDetails.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })
                            : ""}
                    </span>
                </h1>
                <h1 className="font-bold">
                    Created by: <span className="font-normal">{staffDetails?.created_by?.first_name || ""}{" "}{staffDetails?.created_by?.last_name || ""}</span>
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
                            value={data.last_name}
                            disabled={!isEdit}
                            onChange={(e) => setData("last_name", e.target.value)}
                            className={`border px-3 py-2 ${!isEdit ? "text-ascend-gray1" : ""} border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                        {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={data.first_name}
                            disabled={!isEdit}
                            onChange={(e) => setData("first_name", e.target.value)}
                            className={`border px-3 py-2 ${!isEdit ? "text-ascend-gray1" : ""} border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                        {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Middle Name
                        </label>
                        <input
                            type="text"
                            value={data.middle_name}
                            disabled={!isEdit}
                            onChange={(e) => setData("middle_name", e.target.value)}
                            className={`border px-3 py-2 ${!isEdit ? "text-ascend-gray1" : ""} border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                        {errors.middle_name && <span className="text-red-500 text-sm">{errors.middle_name}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={data.contact_number}
                            disabled={!isEdit}
                            onChange={(e) => {
                                    const onlyNumbers = e.target.value.replace(/\D/g, "").slice(0, 11);
                                    setData("contact_number", onlyNumbers);
                                }}
                            className={`border px-3 py-2 ${!isEdit ? "text-ascend-gray1" : ""} border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                        {errors.contact_number && <span className="text-red-500 text-sm">{errors.contact_number}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            disabled={!isEdit}
                            onChange={(e) => setData("email", e.target.value)}
                            className={`border px-3 py-2 ${!isEdit ? "text-ascend-gray1" : ""} border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Birthday
                        </label>
                        <input
                            type="date"
                            value={data.birthdate}
                            disabled={!isEdit}
                            onChange={(e) => setData("birthdate", e.target.value)}
                            className={`border px-3 py-2 ${!isEdit ? "text-ascend-gray1" : ""} border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                        {errors.birthdate && <span className="text-red-500 text-sm">{errors.birthdate}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Gender
                        </label>
                        <select
                            value={data.gender}
                            disabled={!isEdit}
                            onChange={(e) => setData("gender", e.target.value)}
                            className={`textField border px-3 py-2 ${!isEdit ? "text-ascend-gray1" : ""} border-ascend-gray1 focus:outline-ascend-blue`}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
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
                            value={data.house_no}
                            disabled={!isEdit}
                            onChange={(e) => setData("house_no", e.target.value)}
                            className={`border px-3 py-2 ${!isEdit ? "text-ascend-gray1" : ""} border-ascend-gray1 focus:outline-ascend-blue`}
                        />
                        {errors.house_no && <span className="text-red-500 text-sm">{errors.house_no}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Region
                        </label>
                        <select
                            value={data.region_code}
                            disabled={!isEdit}
                            onChange={(e) => handleRegionChange(e.target.value)}
                            className={`textField border px-3 py-2 ${!isEdit ? "text-ascend-gray1" : ""} border-ascend-gray1 focus:outline-ascend-blue`}
                        >
                            <option value="">Select Region</option>
                            {regionList.map((reg) => (
                                <option key={reg.region_code} value={reg.region_code}>
                                    {reg.region_name}
                                </option>
                            ))}
                        </select>
                        {errors.region && <span className="text-red-500 text-sm">{errors.region}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Province
                        </label>
                        <select
                            value={data.province_code}
                            disabled={!isEdit || !provinceList.length}
                            onChange={(e) => handleProvinceChange(e.target.value)}
                            className={`textField border px-3 py-2 ${!isEdit ? "text-ascend-gray1" : ""} border-ascend-gray1 focus:outline-ascend-blue`}
                        >
                            <option value="">Select Province</option>
                            {provinceList.map((prov) => (
                                <option key={prov.province_code} value={prov.province_code}>
                                    {prov.province_name}
                                </option>
                            ))}
                        </select>
                        {errors.province && <span className="text-red-500 text-sm">{errors.province}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            City
                        </label>
                        <select
                            value={data.city_code}
                            disabled={!isEdit || !cityList.length}
                            onChange={(e) => handleCityChange(e.target.value)}
                            className={`textField border px-3 py-2 ${!isEdit ? "text-ascend-gray1" : ""} border-ascend-gray1 focus:outline-ascend-blue`}
                        >
                            <option value="">Select City</option>
                            {cityList.map((ct) => (
                                <option key={ct.city_code} value={ct.city_code}>
                                    {ct.city_name}
                                </option>
                            ))}
                        </select>
                        {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="font-nunito-sans text-size2 text-ascend-black">
                            Barangay
                        </label>
                        <select
                            value={data.barangay_code}
                            disabled={!isEdit || !barangayList.length}
                            onChange={(e) => handleBarangayChange(e.target.value)}
                            className={`textField border px-3 py-2 ${!isEdit ? "text-ascend-gray1" : ""} border-ascend-gray1 focus:outline-ascend-blue`}
                        >
                            <option value="">Select Barangay</option>
                            {barangayList.map((brgy) => (
                                <option key={brgy.brgy_code} value={brgy.brgy_code}>
                                    {brgy.brgy_name}
                                </option>
                            ))}
                        </select>
                        {errors.barangay && <span className="text-red-500 text-sm">{errors.barangay}</span>}
                    </div>
                </div>
            </form>

            {staffDetails && staffDetails?.role === "faculty" && (
                <AssignedCourses />
            )}
        </div>
    );
}
