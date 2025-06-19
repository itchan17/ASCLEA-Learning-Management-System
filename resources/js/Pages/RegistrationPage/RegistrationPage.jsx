import React, { useState, useEffect } from 'react';
import RegistrationFields from './registrationfields'
import PrimaryButton from "../../Components/Button/PrimaryButton";
import { Link } from "@inertiajs/react";

const RegistrationPage = () => {

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
<div className="w-full md:w-[40%] min-h-screen bg-ascend-yellow relative overflow-hidden">
  {/* Blue clipped shape absolutely inside */}
  <div
    className="absolute inset-0 bg-ascend-blue flex items-center p-5 md:mr-5"
    style={{
      clipPath: screenSize === 'small' ? clipPathSmall : clipPathMedium,
    }}
  >
            <div className="text-white flex flex-col justify-center items-center p-10 pr-16 w-full md:w-full">
              <div className="z-10 text-center max-w-xs">
                <h2 className="text-size4 font-nunito-sans font-bold mb-2 mr-0">Already have an account?</h2>
                <p className="mb-4 font-nunito-sans text-size2">
                  Log in to continue your review journey!
                </p>
                <div className="flex justify-center">
                  <Link href={"/login"}>
                    <PrimaryButton
                      text="Sign in"
                      btnColor="bg-ascend-white"
                      textColor="text-ascend-blue"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full md:w-[60%] bg-white flex flex-col items-center justify-center p-8">
        <img src="/images/ascend_logo.png" alt="Ascend Logo" className="w-45 mb-4" />
        <h1 className="text-size5 font-nunito-sans font-bold mb-2">Welcome!</h1>
        <p className="text-size3 font-nunito-sans mb-4">Create your account to get started!</p>
        <RegistrationFields />
      </div>
    </div>
  );
};

export default RegistrationPage;

RegistrationPage.layout = null;
