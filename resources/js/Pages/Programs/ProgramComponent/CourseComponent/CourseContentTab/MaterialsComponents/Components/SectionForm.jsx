import { useState, useEffect } from "react";
import SecondaryButton from "../../../../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../../../../Components/Button/PrimaryButton";
import useModulesStore from "../Stores/modulesStore";

export default function SectionForm({ toggleOpenSectionForm }) {
    // Module Store
    const sectionDetails = useModulesStore((state) => state.sectionDetails);
    const handleSectionDetailsChange = useModulesStore(
        (state) => state.handleSectionDetailsChange
    );
    const handleAddSection = useModulesStore((state) => state.handleAddSection);

    return (
        <div className="border border-ascend-gray1 shadow-shadow1 p-5 space-y-5">
            <h1 className="text-size4 font-bold">Add Section</h1>
            <div>
                <label>
                    Section Title<span className="text-ascend-red">*</span>
                </label>
                <input
                    value={sectionDetails.sectionTitle}
                    onChange={(e) =>
                        handleSectionDetailsChange(
                            "sectionTitle",
                            e.target.value
                        )
                    }
                    type="text"
                    className="p-2 h-9 w-full border border-ascend-gray1 focus:outline-ascend-blue"
                />
            </div>

            <div className="flex flex-wrap justify-end gap-2">
                <SecondaryButton
                    doSomething={toggleOpenSectionForm}
                    text={"Cancel"}
                />
                <PrimaryButton
                    doSomething={() => {
                        handleAddSection();
                        toggleOpenSectionForm();
                    }}
                    text={"Add"}
                />
            </div>
        </div>
    );
}
