import { useState, useRef, useEffect } from "react";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import EmptyState from "../../../../../Components/EmptyState/EmptyState";
import AssessmentForm from "./AssessmentsComponents/AssessmentForm";
import AssessmentItem from "./AssessmentsComponents/AssessmentItem";
import useAssessmentsStore from "../../../../../Stores/Programs/CourseContent/assessmentsStore";

export default function Assessments() {
    // Assessments Store
    const isFormOpen = useAssessmentsStore((state) => state.isFormOpen);
    const toggleAssessmentForm = useAssessmentsStore(
        (state) => state.toggleAssessmentForm
    );
    const assessmentList = useAssessmentsStore((state) => state.assessmentList);

    const targetForm = useRef(null);

    // Scroll into the form once opened
    useEffect(() => {
        if (isFormOpen) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isFormOpen]);
    return (
        <div className="font-nunito-sans text-ascend-black space-y-5">
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <h1 className="text-size6 font-bold">Course Assessments</h1>

                <PrimaryButton
                    isDisabled={isFormOpen}
                    doSomething={toggleAssessmentForm}
                    text="Add Assessment"
                />
            </div>

            {isFormOpen && (
                <div ref={targetForm}>
                    <AssessmentForm toggleForm={toggleAssessmentForm} />
                </div>
            )}
            {/* <AssessmentItem /> */}
            {assessmentList.length > 0 &&
                assessmentList.map((assessment, i) => (
                    <AssessmentItem key={i} assessmentDetails={assessment} />
                ))}

            {/* <EmptyState
                imgSrc={"/images/illustrations/empty.svg"}
                text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
            /> */}
        </div>
    );
}
