import { useState, useEffect } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { IoLogOutSharp } from "react-icons/io5";

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

    const handleLogout = () => {
        router.post(route("logout.user"), {}, { replace: true });
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen bg-ascend-lightblue font-nunito-sans">
            <nav className="absolute flex flex-wrap gap-5 items-center justify-between top-0 h-20 w-full px-6 text-ascend-black">
                <img
                    src="/images/ascend_logo.png"
                    alt="Ascend Logo"
                    className="h-14"
                />

                <div
                    onClick={handleLogout}
                    className="flex space-x-1  hover:bg-ascend-lightblue transition-hover duration-300 cursor-pointer hover:text-ascend-blue"
                >
                    <IoLogOutSharp className="text-size5" />
                    <span className="font-semibold">Sign out</span>
                </div>
            </nav>
            {/* Logo */}
            <div className="flex flex-col justify-center items-center">
                {/* Email Verification Field */}
                <div className="w-full max-w-120 bg-white shadow-md p-6 h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                    <div className="flex flex-col items-center text-ascend-black">
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
        </div>
    );
}

VerifyEmail.layout = null;
