import { useState, useRef, useEffect } from "react";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import MaterialForm from "./MaterialsComponents/MaterialForm";
import useMaterialsStore from "../../../../../Stores/Programs/CourseContent/materialsStore";
import EmptyState from "../../../../../Components/EmptyState/EmptyState";
import MaterialItem from "./MaterialsComponents/MaterialItem";

export default function Materials() {
    // Materials Store
    const materialList = useMaterialsStore((state) => state.materialList);

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

            {/* Open the material form */}
            {isFormOpen && (
                <div ref={targetForm}>
                    <MaterialForm
                        toggleOpenMaterialForm={toggleOpenMaterialForm}
                    />
                </div>
            )}

            {/* Condition to display empty state when no material */}
            <MaterialItem />
            {/* {materialList?.length > 0 ? (
                <MaterialItem />
            ) : (
                <EmptyState
                    imgSrc={"/images/illustrations/empty.svg"}
                    text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
                />
            )} */}
        </div>
    );
}
