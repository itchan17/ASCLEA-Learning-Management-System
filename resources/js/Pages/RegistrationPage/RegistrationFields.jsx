import { useState, useEffect } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import { router, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import useRegistrationStore from "../../Stores/Registration/registrationStore";

const RegistrationFields = () => {
    const route = useRoute();

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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-4">
                    <select
                        value={registration.province}
                        onChange={(e) =>
                            handleRegistrationChange("province", e.target.value)
                        }
                        className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue"
                    >
                        <option value="">
                            Province <span className="text-ascend-red">*</span>
                        </option>
                        <option>None</option>
                        <option>None</option>
                    </select>

                    <select
                        value={registration.city}
                        onChange={(e) =>
                            handleRegistrationChange("city", e.target.value)
                        }
                        className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue"
                    >
                        <option value="">
                            City <span className="text-ascend-red">*</span>
                        </option>
                        <option>None</option>
                        <option>None</option>
                    </select>

                    <select
                        value={registration.barangay}
                        onChange={(e) =>
                            handleRegistrationChange("barangay", e.target.value)
                        }
                        className="textField w-full border border-ascend-gray1 px-3 py-2 text-sm focus:outline-ascend-blue"
                    >
                        <option value="">
                            Barangay <span className="text-ascend-red">*</span>
                        </option>
                        <option>None</option>
                        <option>None</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
                    <div class="relative">
                        <input
                            type="text"
                            value={registration.contact_number}
                            onChange={(e) =>
                                handleRegistrationChange(
                                    "contact_number",
                                    e.target.value
                                )
                            }
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
                            type="password"
                            value={registration.password}
                            onChange={(e) =>
                                handleRegistrationChange(
                                    "password",
                                    e.target.value
                                )
                            }
                            id="PasswordOutlined"
                            class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer"
                            placeholder=" "
                        />
                        <label
                            for="PasswordOutlined"
                            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Password <span className="text-ascend-red">*</span>
                        </label>
                    </div>
                    <div class="relative">
                        <input
                            type="password"
                            value={registration.password_confirmation}
                            onChange={(e) =>
                                handleRegistrationChange(
                                    "password_confirmation",
                                    e.target.value
                                )
                            }
                            id="CPasswordOutlined"
                            class="block px-3 py-2 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer"
                            placeholder=" "
                        />
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
