import { useState, useEffect } from "react";
import SecondaryButton from "../../../../../../../Components/Button/SecondaryButton";
import PrimaryButton from "../../../../../../../Components/Button/PrimaryButton";
import useModulesStore from "../Stores/modulesStore";
import useSection from "../Hooks/useSection";
import { usePage } from "@inertiajs/react";

export default function SectionForm({
    setIsSectionFormOpen,
    isEdit = false,
    sectionId = null,
    formTitle,
    formWIdth,
}) {
    const { program, course } = usePage().props;

    // Module Store
    const sectionDetails = useModulesStore((state) => state.sectionDetails);
    const handleSectionDetailsChange = useModulesStore(
        (state) => state.handleSectionDetailsChange
    );
    const clearSectionDetails = useModulesStore(
        (state) => state.clearSectionDetails
    );

    // Custom hook
    const { isLoading, errors, handleAddUpdateSection } = useSection({
        programId: program.program_id,
        courseId: course.course_id,
    });

    // clear section details when unmount
    useEffect(() => {
        return () => {
            clearSectionDetails();
        };
    }, []);

    return (
        <div
            className={`w-full ${formWIdth} border border-ascend-gray1 p-5 space-y-5 bg-ascend-white ${
                isEdit ? "" : "shadow-shadow1"
            }`}
        >
            <h1 className="text-size4 font-bold">
                {formTitle || "Add Section"}
            </h1>
            <div>
                <label>
                    Section Title<span className="text-ascend-red">*</span>
                </label>
                <input
                    value={sectionDetails.section_title}
                    onChange={(e) =>
                        handleSectionDetailsChange(
                            "section_title",
                            e.target.value
                        )
                    }
                    type="text"
                    className={`px-3 py-2 w-full border border-ascend-gray1 focus:outline-ascend-blue ${
                        errors && errors.section_title
                            ? "border-2 border-ascend-red"
                            : ""
                    }`}
                />
                {errors && errors.section_title && (
                    <span className="text-ascend-red">
                        {errors.section_title}
                    </span>
                )}
            </div>

            <div className="flex flex-wrap justify-end gap-2">
                <SecondaryButton
                    isDisabled={isLoading}
                    doSomething={() => setIsSectionFormOpen(false)}
                    text={"Cancel"}
                />
                <PrimaryButton
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    doSomething={() => {
                        handleAddUpdateSection(
                            setIsSectionFormOpen,
                            isEdit,
                            sectionId
                        );
                    }}
                    text={isEdit ? "Save" : "Add"}
                />
            </div>
        </div>
    );
}
