import { useState, useRef, useEffect } from "react";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import MaterialForm from "./MaterialsComponents/MaterialForm";

export default function Materials() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const targetForm = useRef(null);

    // Open Material form through button
    const toggleOpenMaterialForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    // Scroll into the form once opened
    useEffect(() => {
        if (isFormOpen) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isFormOpen]);

    return (
        <div className="font-nunito-sans text-ascend-black space-y-5">
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <h1 className="text-size6 font-bold">Course Materials</h1>

                <PrimaryButton
                    doSomething={toggleOpenMaterialForm}
                    isDisabled={isFormOpen}
                    text="Add Material"
                />
            </div>

            {isFormOpen && (
                <div ref={targetForm}>
                    <MaterialForm
                        toggleOpenMaterialForm={toggleOpenMaterialForm}
                    />
                </div>
            )}
        </div>
    );
}
