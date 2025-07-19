import { useState, useEffect } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

export default function VerifyEmail() {
    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [messsage, setMessage] = useState("");

    const resendEmailVerification = () => {
        setMessage("");
        router.post(
            route("verification.send"),
            {},
            {
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
                onSuccess: (page) => {
                    console.log(page);
                    if (page.props.flash.message)
                        setMessage(page.props.flash.message);
                    setLoading(false);
                },
            }
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5 font-nunito-sans">
            {/* Logo */}
            <img
                src="/images/ascend_logo.png"
                alt="Ascend Logo"
                className="w-40 mb-6 mx-auto"
            />

            {/* Email Verification Field */}
            <div className="w-full max-w-120 bg-white shadow-md p-6 h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-center mb-2">
                        Email Verification
                    </h2>
                    <p className="text-size3 font-bold">
                        We’ve sent you a verification link!
                    </p>
                    <p className=" text-gray-600 text-center">
                        Please check your email and click the link to verify
                        your account.
                    </p>
                </div>
                {messsage && (
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
                        <span>{messsage}</span>
                    </div>
                )}

                {/* Send Link Button */}
                <div className="grid grid-cols-1">
                    <PrimaryButton
                        isDisabled={loading}
                        doSomething={resendEmailVerification}
                        text="Resend Email"
                    />
                </div>
            </div>
        </div>
    );
}

VerifyEmail.layout = null;
