import React from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";

export default function VerifyEmail() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
            {/* Logo */}
            <img
                src="/images/ascend_logo.png"
                alt="Ascend Logo"
                className="w-40 mb-6 mx-auto"
            />

            {/* Email Verification Field */}
            <div className="w-full max-w-sm bg-white shadow-md p-6 h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
                <h2 className="text-2xl font-bold text-center mb-5">
                    Email Verification
                </h2>
                <p className="text-sm text-gray-600 mb-10 text-center">
                    To reset your password, please enter your email address
                    below. We’ll verify your account before allowing changes.
                </p>

                {/* Send Link Button */}
                <div className="grid grid-cols-1">
                    <PrimaryButton text="Resend Email" />
                </div>
            </div>
        </div>
    );
}

VerifyEmail.layout = null;
