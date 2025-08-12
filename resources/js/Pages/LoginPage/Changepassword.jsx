import React, { useState } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import { usePage, useForm } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

export default function ChangePassword() {
    const route = useRoute();

    const [errorMsg, setErrorMsg] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { props } = usePage();
    const { data, setData, post, processing, reset } = useForm({
        token: props.token,
        password: "",
        password_confirmation: "",
    });

    const handleChangePassword = (e) => {
        setErrorMsg(null);
        e.preventDefault();
        post(route("reset.password.post"), {
            replace: true,
            onError: (error) => setErrorMsg(error),
            onSuccess: () =>
                reset("password", "password_confirmation", "token"),
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <img
                src="/images/ascend_logo.png"
                alt="Ascend Logo"
                className="w-40 mb-6 mx-auto"
            />
            <form
                onSubmit={handleChangePassword}
                className="w-full max-w-120 bg-white shadow-md p-6 space-y-4 h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4"
            >
                <h2 className="text-2xl font-bold text-center mb-5">
                    Change Password
                </h2>
                <p className="text-sm text-gray-600 mb-10 text-center">
                    Please enter a new password.
                </p>

                {/* New Password Field */}
                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="newpasswordfloat"
                        class="block px-4 py-3 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer password-input"
                        placeholder=" "
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <label
                        htmlFor="newpasswordfloat"
                        class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                        New Password
                    </label>
                </div>

                {/* Re-enter Password Field */}
                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="reenternewpasswordfloat"
                        class="block px-4 py-3 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer password-input"
                        placeholder=" "
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                    <label
                        htmlFor="reenternewpasswordfloat"
                        class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                        Re-Enter New Password
                    </label>
                </div>

                {/* Checkbox*/}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-3 h-3 mr-2 text-blue-300 accent-ascend-blue"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            Show password
                        </label>
                    </div>
                </div>

                {errorMsg && (
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

                        <span>{errorMsg.password || errorMsg.error}</span>
                    </div>
                )}

                {/* Reset Button */}
                <div className="grid">
                    <PrimaryButton
                        isDisabled={processing}
                        isLoading={processing}
                        btnType="submit"
                        text="Reset Password"
                        className="w-full"
                    />
                </div>
            </form>
        </div>
    );
}

ChangePassword.layout = null;
