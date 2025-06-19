import React, { useState } from 'react';
import PrimaryButton from "../../Components/Button/PrimaryButton";

export default function EmailVerification() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailVerification = () => {
    console.log('Verifying Email', email);
  };

function PrimaryButton({ doSomething, icon, text, textColor, btnColor, className }) {
    return (
      <button
        onClick={doSomething}
        className={`${btnColor || "bg-ascend-blue"} hover:opacity-80 flex items-center justify-center cursor-pointer text-ascend-white transition-all duration-300 ${className || ''} px-5 h-10 space-x-1`}
      >
        {icon && <div className="text-xl">{icon}</div>}
        <span className={`font-semibold ${textColor || ''}`}>{text}</span>
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Logo */}
      <img src="/images/ascend_logo.png" alt="Ascend Logo" className="w-40 mb-6 mx-auto" />

      {/* Email Verification Field */}
      <div className="w-full max-w-sm bg-white shadow-md p-6 space-y-4 h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4 space-y-5">
        <h2 className="text-2xl font-bold text-center mb-5">Email Verification</h2>
        <p className="text-sm text-gray-600 mb-10 text-center">
            To reset your password, please enter your email address below. We’ll verify your account before allowing changes.
        </p>
            <div className="relative mb-4">
        <input
            type="text"
            id="emailfloat"
            className="block px-4 py-3 w-full text-sm bg-transparent border border-ascend-gray1 appearance-none dark:border-gray-600 dark:focus:border-ascend-blue focus:outline-none focus:ring-0 focus:border-ascend-blue peer"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <label
            htmlFor="emailfloat"
            className="absolute text-size2 font-nunito-sans dark:text-ascend-gray2 duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-ascend-blue peer-focus:dark:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 mb-2"
        >
            Email
        </label>
        </div>
        
        {/* Send Link Button */}
        <PrimaryButton
          doSomething={handleEmailVerification}
          text="Send Link"
          className="w-full mt-4"
        />
      </div>
    </div>
  );
}

EmailVerification.layout = null;
