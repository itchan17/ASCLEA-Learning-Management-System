import React from 'react'
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";


export default function ApprovalModal({ toggleModal }) {
    console.log("Render Add Approval Form");

  return (
        <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
            <form
                className="bg-ascend-white opacity-100 p-5 w-130 space-y-5 max-h-[calc(100vh-5rem)] overflow-y-auto my-10 shadow-2xl"
            >
                <h1 className="text-size4 font-bold text-center">Confirm Rejection</h1>
                <h2 className="text-size3 text-center">
                    Are you sure you want to reject this request?
                </h2>
                <div>
                    <label htmlFor="">Add Message</label>
                    <textarea
                        className="border w-full p-2 mt-2 focus:outline-ascend-blue"
                        rows={5}
                    ></textarea>
                </div>
                
                <div className="flex justify-end space-x-2">
                    <SecondaryButton doSomething={toggleModal} text={"Close"} />
                    <PrimaryButton btnType={"submit"} btnColor={"bg-ascend-red"} text={"Reject"} />
                </div>
            </form>
        </div>
  )
};