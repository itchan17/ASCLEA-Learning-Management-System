import React, { useState } from 'react';
import PrimaryButton from "../../Components/Button/PrimaryButton";

export default function ChangePassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterNewPassword, setReEnterNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = () => {
    console.log('Changing password', email, password);
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
      <img src="/images/ascend_logo.png" alt="Ascend Logo" className="w-40 mb-6 mx-auto" />
      <div className="w-full max-w-sm bg-white shadow-md p-6 space-y-4 h-full sm:border border-ascend-gray1 sm:shadow-shadow1 sm:p-4">
        <h2 className="text-2xl font-bold text-center mb-5">Change Password</h2>
        <p className="text-sm text-gray-600 mb-10 text-center">
          Please enter a new password.
        </p>

        {/* Email Field */}
        <div className="relative mb-4">
          <input
            type="text"
            id="emailfloat"
            class="block px-4 py-3 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="emailfloat"
            class="absolute text-sm text-ascend-gray1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Email
          </label>
        </div>

        {/* New Password Field */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            id="newpasswordfloat"
            class="block px-4 py-3 w-full text-sm bg-transparent border-1 border-ascend-gray1 appearance-non focus:outline-ascend-blue peer password-input"
            placeholder=" "
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            value={reEnterNewPassword}
            onChange={(e) => setReEnterNewPassword(e.target.value)}
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

        {/* Reset Button */}
        <PrimaryButton
          doSomething={handleChangePassword}
          text="Reset Password"
          className="w-full"
        />
      </div>
    </div>
  );
}

ChangePassword.layout = null;
