import React, { useState } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function EmailVerification() {
    const [successMsg, setSuccessMsg] = useState(null);
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            email: "",
        });

    const handleEmailVerification = (e) => {
        setSuccessMsg(null);
        clearErrors();
        e.preventDefault();
        post("/forget-password", {
            replace: true,
            onError: () => {
                setData({ email: "" });
            },
            onSuccess: (page) => {
                setData({ email: "" });
                setSuccessMsg(page.props.flash.success);
            },
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {/* Logo */}
            <img
                src="/images/ascend_logo.png"
                alt="Ascend Logo"
                className="w-40 mb-6 mx-auto"
            />

            {/* Email Verification Field */}
            <div className="w-full max-w-120 bg-white shadow-md p-6 h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                <h2 className="text-2xl font-bold text-center mb-5">
                    Email Verification
                </h2>
                <p className="text-sm text-gray-600 mb-10 text-center">
                    To reset your password, please enter your email address
                    below. We’ll verify your account before allowing changes.
                </p>
                <form onSubmit={handleEmailVerification} className="space-y-5">
                    <div className="relative">
                        <input
                            type="text"
                            id="emailfloat"
                            class="block px-4 py-3 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer"
                            placeholder=" "
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <label
                            htmlFor="emailfloat"
                            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Email
                        </label>
                    </div>

                    {errors.email && (
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
                            {console.log(errors)}
                            <span>{errors.email}</span>
                        </div>
                    )}

                    {successMsg && (
                        <div
                            role="alert"
                            className="alert alert-success rounded-none font-nunito-sans mt-4"
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
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{successMsg}</span>
                        </div>
                    )}
                    {/* Send Link Button */}
                    <div className="grid">
                        <PrimaryButton
                            btnType="submit"
                            isDisabled={processing}
                            isLoading={processing}
                            text="Send Link"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

EmailVerification.layout = null;
