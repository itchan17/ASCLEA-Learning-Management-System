import React, { useState } from "react";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";

export default function TermsConditionModal({ closeTermsConditionModal, approveTerms }) {
  return (
    <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          approveTerms();
        }}
        className="bg-ascend-white p-5 w-130 space-y-5 max-h-[calc(100vh-5rem)] overflow-y-auto my-10 shadow-2xl"
      >
        <h2 className="text-size3 text-justify font-semibold">
            Please read and agree to the terms and conditions before proceeding.
        </h2>

        <div className="text-size2 text-justify my-4 p-4 border border-ascend-gray1 max-h-64 overflow-y-auto">
        <p>
            By using this Learning Management System (LMS), you agree to provide certain personal 
            information such as your name, email, and other details required for registration and 
            course participation. This information is collected to ensure a smooth and personalized 
            learning experience.
        </p>
        <p className="mt-2">
            During online quizzes or assessments, the LMS may monitor your activity and capture 
            screenshots to detect any suspicious behavior that may indicate academic dishonesty. 
            This helps maintain fairness and integrity in the learning process.
        </p>
        <p className="mt-2">
            All personal data and quiz monitoring information collected will be securely stored 
            and handled according to applicable data protection laws. The data will be used solely 
            for educational purposes and ensuring the proper functioning of the LMS.
        </p>
        <p className="mt-2">
            By participating in quizzes and using the LMS, you consent to this data collection and 
            monitoring. The system is designed to respect your privacy while ensuring academic 
            integrity.
        </p>
        <p className="mt-2">
            Your data will only be retained as long as necessary for the purposes outlined here, 
            after which it will be securely deleted or anonymized. You have the right to request 
            information about your data and its usage at any time.
        </p>
        </div>

        <div className="flex justify-center space-x-2">
          <SecondaryButton doSomething={closeTermsConditionModal} text="Close" />
          <PrimaryButton btnType="submit" text="Agree" />
        </div>
      </form>
    </div>
  );
}

