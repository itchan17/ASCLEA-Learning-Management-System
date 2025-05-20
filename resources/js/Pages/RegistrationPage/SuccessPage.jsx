import React from 'react'
import PrimaryButton from "../../Components/Button/PrimaryButton";
import { router } from '@inertiajs/react';

export const SuccessPage = () => {
  return (
    
    <div className="px-4 py-12 m-20 sm:px-8 lg:px-40">

        <div className="flex justify-center mb-6">
        <img className="w-full max-w-xs object-contain" src="/images/Sent Message-bro.svg" alt="Success Illustration"/>
        </div>

        <h1 className="text-center text-size6 font-nunito-sans font-bold italic  text-black mb-2">Thank you for choosing <span className="text-ascend-blue">ASCEND!</span></h1>

        <h2 className="text-center text-size4 font-nunito-sans text-black mb-2">We’ve sent you an email containing the payment details and <br /> further instructions to complete your enrollment.</h2>
        
        <div className="flex justify-center">
        <PrimaryButton 
          doSomething={() => router.visit('/')}
          text = "Done"
        />
        </div>
        
    </div>

  )
}

export default SuccessPage;