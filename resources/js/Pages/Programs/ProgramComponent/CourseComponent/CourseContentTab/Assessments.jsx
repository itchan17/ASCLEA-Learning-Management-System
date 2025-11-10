import { useState, useRef, useEffect, useCallback } from "react";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import AssessmentForm from "./AssessmentsComponents/AssessmentForm";
import RoleGuard from "../../../../../Components/Auth/RoleGuard";
import AssesssmentList from "./AssessmentsComponents/AssesssmentList";

export default function Assessments() {
    const [isAssessmentFormOpen, setIsAssessmentFormOpen] = useState(false);

    const targetForm = useRef(null); // use to reference the loader

    // Scroll into the form once opened
    useEffect(() => {
        if (isAssessmentFormOpen) {
            targetForm.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [isAssessmentFormOpen]);

    const toggleAssessmentForm = () => {
        setIsAssessmentFormOpen(!isAssessmentFormOpen);
    };

    return (
        <div className="font-nunito-sans text-ascend-black space-y-5">
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <h1 className="text-size6 font-bold">Course Assessments</h1>

                <RoleGuard allowedRoles={["admin", "faculty"]}>
                    <PrimaryButton
                        isDisabled={isAssessmentFormOpen}
                        doSomething={toggleAssessmentForm}
                        text="Add Assessment"
                    />
                </RoleGuard>
            </div>

            {isAssessmentFormOpen && (
                <div ref={targetForm}>
                    <AssessmentForm
                        setIsAssessmentFormOpen={setIsAssessmentFormOpen}
                        toggleForm={toggleAssessmentForm}
                    />
                </div>
            )}

            <AssesssmentList
                setIsAssessmentFormOpen={setIsAssessmentFormOpen}
            />
        </div>
    );
}
