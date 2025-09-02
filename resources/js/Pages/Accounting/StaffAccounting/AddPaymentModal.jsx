import React from 'react'
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import ModalContainer from "../../../Components/ModalContainer";

export default function AddPaymentModal({ togglePaymentForm }) {
  return (
    <ModalContainer>
        <form className="bg-ascend-white opacity-100 p-5 w-112 space-y-5">
            <h1 className="text-size4 font-bold">Add Payment</h1>

            <div className="flex flex-col">
                <label className="text-size2 text-ascend-black">
                    Payment Method
                    <span className="text-ascend-red">*</span>
                </label>
                <input
                    type="text"
                    className="border px-3 py-2  border-ascend-gray1 focus:outline-ascend-blue"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-size2 text-ascend-black">
                    Payment Transaction ID
                    <span className="text-ascend-red">*</span>
                </label>
                <input
                    type="text"
                    className="border px-3 py-2  border-ascend-gray1 focus:outline-ascend-blue"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-size2 text-ascend-black">
                    Receipt Date
                    <span className="text-ascend-red">*</span>
                </label>
                <input
                    type="date"
                    className="border px-3 py-2  border-ascend-gray1 focus:outline-ascend-blue"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-size2 text-ascend-black">
                    Payment Amount
                    <span className="text-ascend-red">*</span>
                </label>
                <input
                    type="text"
                    className="border px-3 py-2  border-ascend-gray1 focus:outline-ascend-blue"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-nunito-sans text-size2 text-ascend-black">
                    Proof of Payment
                    <span className="text-ascend-red">*</span>
                </label>

            </div>

            <div className="flex justify-end gap-2">
                <SecondaryButton text={"Cancel"} doSomething={togglePaymentForm} />
                <PrimaryButton text={"Add"} doSomething={togglePaymentForm} />
            </div>
        </form>
    </ModalContainer>

  )
}
