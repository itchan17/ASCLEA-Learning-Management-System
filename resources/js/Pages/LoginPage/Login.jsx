import React, { useState, useEffect } from 'react';
import PrimaryButton from "../../Components/Button/PrimaryButton";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Logging in', username, password);
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

  const [screenSize, setScreenSize] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 'medium' : 'small'
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleResize = () => {
      setScreenSize(mediaQuery.matches ? 'medium' : 'small');
    };

    handleResize();
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const clipPathSmall = 'polygon(0% 0, 100% 0%, 100% 90%, 0% 100%)'; // for small screen
  const clipPathMedium = 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)'; // for big or medium screen

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col md:flex-row">
      {/* LEFT SIDE - Enroll section */}
      <div className="w-full h-100 md:h-screen md:w-1/2">
        <div
          className="h-full bg-ascend-yellow"
          style={{ clipPath: screenSize === 'small' ? clipPathSmall : clipPathMedium }}
        >
          <div
            className="h-93 md:h-full bg-ascend-blue md:mr-5 flex items-center p-5"
            style={{ clipPath: screenSize === 'small' ? clipPathSmall : clipPathMedium }}
          >
            
            <div className=" text-white flex flex-col justify-center items-center p-10 pr-16 w-full md:w-full">
              <div className="z-10 text-center max-w-xs">
                <h2 className="text-xl font-bold mb-2 mr-0">Not enrolled yet?</h2>
                <p className="mb-4 text-xl-1">Enroll now to gain access and start your review journey!</p>
                <PrimaryButton
                  text = "Enroll"
                  btnColor = "bg-ascend-white"
                  textColor= "text-ascend-blue"
                  className = "mx-auto"
                ></PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8">
        <img src="/images/ascend_logo.png" alt="Ascend Logo" className="w-60 mb-6" />
        <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
        <p className="text-xl-1 text mb-4">Sign to your account to continue</p>

        <form className="w-full max-w-sm">

          <div className="relative mb-4">
            <input
              type="text"
              id="usernamefloat"
              className="block px-4 py-3  w-full text-sm bg-transparent border border-ascend-gray1 appearance-none dark:border-gray-600 dark:focus:border-ascend-blue focus:outline-none focus:ring-0 focus:border-ascend-blue peer"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label
              htmlFor="usernamefloat"
              className="absolute text-size2 font-nunito-sans dark:text-ascend-gray2 duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-ascend-blue peer-focus:dark:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Username
            </label>
          </div>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              id="passwordfloat"
              className="block px-4 py-3 w-full text-sm bg-transparent border border-ascend-gray1 appearance-none dark:border-gray-600 dark:focus:border-ascend-blue focus:outline-none focus:ring-0 focus:border-ascend-blue peer"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="passwordfloat"
              className="absolute text-size2 font-nunito-sans dark:text-ascend-gray2 duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-ascend-blue peer-focus:dark:text-ascend-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Password
            </label>
          </div>

          <div className="flex justify-between items-center text-sm mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-3 h-3 mr-2 text-blue-300 accent-ascend-blue "
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              /> Show password
            </label>
            <a href="#" className="text-ascend-blue hover:underline">Forgot password?</a>
          </div>

          <PrimaryButton doSomething={handleLogin} text="Sign in" className={"w-full"} />
        </form>
      </div>
    </div>
  );
}

Login.layout = null;
