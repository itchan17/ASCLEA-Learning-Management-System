import React from "react";
import SinglePage from "../../../../../../Components/Layout/SInglePage";
import PrimaryButton from "../../../../../../Components/Button/PrimaryButton";

export default function QuizForm() {
    return (
        <SinglePage>
            <div className="w-full max-w-235 space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-size6 font-bold">Create Quiz</h1>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            <input
                                type="checkbox"
                                defaultChecked
                                className="toggle toggle-md border-ascend-blue bg-ascend-white checked:border-ascend-blue checked:bg-ascend-blue checked:text-ascend-white"
                            />
                            <span className="text-ascend-black font-bold">
                                Reveal answers after
                            </span>
                        </div>

                        <PrimaryButton text={"Publish"} />
                    </div>
                </div>
                <div className="w-full h-100 border border-ascend-gray1 shadow-shadow1 p-5">
                    Quiz form
                </div>
            </div>
        </SinglePage>
    );
}

QuizForm.layout = null;
