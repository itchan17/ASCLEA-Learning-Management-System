import { useState, useEffect } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import { router, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import useRegistrationStore from "../../Stores/Registration/registrationStore";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { regions, provinces, cities, barangays } from "select-philippines-address";


const RegistrationFields = () => {
    const route = useRoute();

    // Toggle Password State
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Region, Province, City and Barangay
    const [regionList, setRegionList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [barangayList, setBarangayList] = useState([]);

    useEffect(() => {
        regions().then((res) => {
            setRegionList(res);
        });
    }, []);

    const handleRegionChange = (regionCode) => {
        handleRegistrationChange("region", regionCode);
        provinces(regionCode).then((res) => {
            setProvinceList(res);
            setCityList([]); // clear cities
            setBarangayList([]); // clear barangays
        });
    };

    const handleProvinceChange = (provinceCode) => {
        handleRegistrationChange("province", provinceCode);
        cities(provinceCode).then((res) => {
            setCityList(res);
            setBarangayList([]);
        });
    };

    const handleCityChange = (cityCode) => {
        handleRegistrationChange("city", cityCode);
        barangays(cityCode).then((res) => {
            setBarangayList(res);
        });
    };

    // Registration store
    const registration = useRegistrationStore((state) => state.registration);
    const handleRegistrationChange = useRegistrationStore(
        (state) => state.handleRegistrationChange
    );
    const clearRegistration = useRegistrationStore(
        (state) => state.clearRegistration
    );

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const register = () => {
        setErrorMessage("");

        router.post(route("register.user"), registration, {
            replace: true, // Prevent user from going back to this page
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
            onError: (error) => {
                setErrorMessage(error);
                setLoading(false);
            },
            onSuccess: () => {
                clearRegistration();
                setLoading(false);
            },
        });
    };

    return (
        <>
            <div className="mx-auto max-w-4xl bg-white">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div class="relative">
                        <input
                            type="text"
                            value={registration.last_name}
                            onChange={(e) =>
                                handleRegistrationChange(
                                    "last_name",
                                    e.target.value
                                )
                            }
                            id="LastNameOutlined"
                            class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer"
                            placeholder=" "
                        />
                        <label
                            for="LastNameOutlined"
                            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Last Name <span className="text-ascend-red">*</span>
                        </label>
                    </div>
                    <div class="relative">
                        <input
                            type="text"
                            value={registration.first_name}
                            onChange={(e) =>
                                handleRegistrationChange(
                                    "first_name",
                                    e.target.value
                                )
                            }
                            id="FirstNameOutlined"
                            class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer"
                            placeholder=" "
                        />
                        <label
                            for="FirstNameOutlined"
                            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            First Name{" "}
                            <span className="text-ascend-red">*</span>
                        </label>
                    </div>
                    <div class="relative">
                        <input
                            type="text"
                            value={registration.middle_name}
                            onChange={(e) =>
                                handleRegistrationChange(
                                    "middle_name",
                                    e.target.value
                                )
                            }
                            id="MiddleNameOutlined"
                            class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer"
                            placeholder=" "
                        />
                        <label
                            for="MiddleNameOutlined"
                            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Middle Name{" "}
                            <span className="text-ascend-red">*</span>
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
                    <div>
                        <input
                            type="date"
                            value={registration.birthdate}
                            onChange={(e) =>
                                handleRegistrationChange(
                                    "birthdate",
                                    e.target.value
                                )
                            }
                            className="w-full border border-ascend-gray1 px-3 py-2 text-sm  focus:outline-ascend-blue"
                        />
                    </div>
                    <div>
                        <select
                            value={registration.gender}
                            onChange={(e) =>
                                handleRegistrationChange(
                                    "gender",
                                    e.target.value
                                )
                            }
                            className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue"
                        >
                            <option value="">
                                Select sex{" "}
                                <span className="text-ascend-red">*</span>
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 pt-4">
                    <div class="relative">
                        <input
                            type="text"
                            value={registration.house_no}
                            onChange={(e) =>
                                handleRegistrationChange(
                                    "house_no",
                                    e.target.value
                                )
                            }
                            id="HouseStreetOutlined"
                            class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer"
                            placeholder=" "
                        />
                        <label
                            for="HouseStreetOutlined"
                            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            House no., Street{" "}
                            <span className="text-ascend-red">*</span>
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
                    {/* Region */}
                    <div>
                        <select
                            value={registration.region}
                            onChange={(e) => handleRegionChange(e.target.value)}
                            className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue"
                        >
                            <option value="">Select Region</option>
                            {regionList.map((reg) => (
                                <option key={reg.region_code} value={reg.region_code}>
                                    {reg.region_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Province */}
                    <div>
                        <select
                            value={registration.province}
                            onChange={(e) => handleProvinceChange(e.target.value)}
                            disabled={!provinceList.length}
                            className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue"
                        >
                            <option value="">Select Province</option>
                            {provinceList.map((prov) => (
                                <option key={prov.province_code} value={prov.province_code}>
                                    {prov.province_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* City */}
                    <div>
                        <select
                            value={registration.city}
                            onChange={(e) => handleCityChange(e.target.value)}
                            disabled={!cityList.length}
                            className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue"
                        >
                            <option value="">Select City</option>
                            {cityList.map((ct) => (
                                <option key={ct.city_code} value={ct.city_code}>
                                    {ct.city_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Barangay */}
                    <div>
                        <select
                            value={registration.barangay}
                            onChange={(e) => handleRegistrationChange("barangay", e.target.value)}
                            disabled={!barangayList.length}
                            className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue"
                        >
                            <option value="">Select Barangay</option>
                            {barangayList.map((brgy) => (
                                <option key={brgy.brgy_code} value={brgy.brgy_code}>
                                    {brgy.brgy_name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
                    <div class="relative">
                        <input
                            type="text"
                            value={registration.contact_number}
                            onChange={(e) => {
                                const onlyNumbers = e.target.value.replace(/\D/g, "").slice(0, 11);
                                handleRegistrationChange("contact_number", onlyNumbers);
                                }}
                            id="ContactOutlined"
                            class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer"
                            placeholder=" "
                        />
                        <label
                            for="ContactOutlined"
                            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Contact Number
                        </label>
                    </div>
                    <div class="relative">
                        <input
                            type="text"
                            value={registration.email}
                            onChange={(e) =>
                                handleRegistrationChange(
                                    "email",
                                    e.target.value
                                )
                            }
                            id="EmailAddressOutlined"
                            class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer"
                            placeholder=" "
                        />
                        <label
                            for="EmailAddressOutlined"
                            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Email Address{" "}
                            <span className="text-ascend-red">*</span>
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 pt-4">
                    <select
                        onChange={(e) =>
                            handleRegistrationChange("program", e.target.value)
                        }
                        className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue"
                    >
                        <option value="">
                            Program <span className="text-ascend-red">*</span>
                        </option>
                        <option>LET</option>
                        <option>CPT</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
                    <div class="relative">
                    <input
                            type={showPassword ? "text" : "password"}
                            value={registration.password}
                            onChange={(e) => handleRegistrationChange("password", e.target.value)}
                            id="PasswordOutlined"
                            className="block px-3 py-2 w-full text-sm bg-transparent border border-ascend-gray1 focus:outline-ascend-blue peer"
                            placeholder=" "
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2 text-gray-500"
                            tabIndex={-1} // so tabbing skips the button
                        >
                            {showPassword ? (
                            // Eye Slash Icon
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-4.418-8-8 0-.69.07-1.361.2-2m2.015-3.452A9.956 9.956 0 0112 5c4.418 0 8 4.418 8 8 0 1.337-.328 2.597-.91 3.704M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            ) : (
                            // Eye Icon
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            )}
                        </button>
                        <label
                            for="PasswordOutlined"
                            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Password <span className="text-ascend-red">*</span>
                        </label>
                    </div>
                    <div class="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={registration.password_confirmation}
                            onChange={(e) =>
                                handleRegistrationChange("password_confirmation", e.target.value)
                            }
                            id="CPasswordOutlined"
                            className="block px-3 py-2 w-full text-sm bg-transparent border border-ascend-gray1 focus:outline-ascend-blue peer"
                            placeholder=" "
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-2 text-gray-500"
                        >
                            {showConfirmPassword ? (
                                // Eye Slash Icon
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-4.418-8-8 0-.69.07-1.361.2-2m2.015-3.452A9.956 9.956 0 0112 5c4.418 0 8 4.418 8 8 0 1.337-.328 2.597-.91 3.704M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            ) : (
                                // Eye Icon
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                        <label
                            for="CPasswordOutlined"
                            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Confirm Password{" "}
                            <span className="text-ascend-red">*</span>
                        </label>
                    </div>
                </div>

                {errorMessage.error && (
                    <div
                        role="alert"
                        className="alert alert-error rounded-none font-nunito-sans mt-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{errorMessage.error}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 pt-4">
                    <PrimaryButton
                        isDisabled={loading}
                        doSomething={register}
                        text="Register"
                    />
                </div>
            </div>
        </>
    );
};

export default RegistrationFields;
