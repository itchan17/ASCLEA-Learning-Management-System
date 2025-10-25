import { useState } from "react";
import EmptyState from "../../../Components/EmptyState/EmptyState";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SecondaryButton from "../../../Components/Button/SecondaryButton";
import DropFiles from "../../../Components/DragNDropFiles/DropFiles";

export default function UnapprovedStudentAdmission() {
    const [openForm, setOpenForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const toggleForm = () => {
        setOpenForm(!openForm);
    };

    const handleSubmit = () => {
        toggleForm();
        setSubmitted(true);
    };

    return (
        <div className="flex justify-center font-nunito-sans">
            {submitted ? (
                <div className="flex flex-col justify-center">
                    <div className="flex justify-center items-center font-bold">
                        <h1 className="pr-3">Status:</h1>
                        <div className="w-4 h-4 bg-ascend-yellow rounded-4xl shrink-0 mr-1"></div>
                        <span>Pending Review</span>
                    </div>
                    <EmptyState
                        imgSrc={"/images/illustrations/review.svg"}
                        text={`“Your account is currently under review. Please wait while we verify your information. You'll be notified once it's complete.”`}
                    />
                </div>
            ) : (
                <div className="flex flex-col justify-center space-y-5">
                    <EmptyState
                        imgSrc={"/images/illustrations/upload_document.svg"}
                        text={`"One step away! Upload your  proof of enrollment to start exploring."`}
                    />
                    <PrimaryButton
                        doSomething={toggleForm}
                        text={"Upload File"}
                    />
                </div>
            )}

            {openForm && (
                <div className="fixed inset-0 bg-black/25 z-100 flex items-center justify-center">
                    <form className="bg-ascend-white opacity-100 p-5 w-150 space-y-5  max-h-[calc(100vh-5rem)] overflow-y-auto my-10">
                        <h1 className="text-size4 font-bold">Add File</h1>
                        <DropFiles withCancel={true} />
                        <div className="flex justify-end gap-2">
                            <SecondaryButton
                                doSomething={toggleForm}
                                text={"Cancel"}
                            />
                            <PrimaryButton
                                doSomething={handleSubmit}
                                text={"Submit"}
                            />
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
