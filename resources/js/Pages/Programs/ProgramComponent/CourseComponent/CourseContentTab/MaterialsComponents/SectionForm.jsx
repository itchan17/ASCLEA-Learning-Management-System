import { useState, useEffect } from "react";
import SecondaryButton from "../../../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../../../Components/Button/PrimaryButton";

export default function SectionForm({ toggleOpenSectionForm }) {
    return (
        <div className="border border-ascend-gray1 shadow-shadow1 p-5 space-y-5">
            <h1 className="text-size4 font-bold">Add Section</h1>
            <div>
                <label>
                    Section Title<span className="text-ascend-red">*</span>
                </label>
                <input
                    type="text"
                    className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                />
            </div>

            <div className="flex flex-wrap justify-end gap-2">
                <SecondaryButton
                    doSomething={toggleOpenSectionForm}
                    text={"Cancel"}
                />
                <PrimaryButton text={"Add"} />
            </div>
        </div>
    );
}
