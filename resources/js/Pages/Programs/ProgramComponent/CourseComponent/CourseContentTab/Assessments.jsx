import { useState, useRef, useEffect } from "react";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import EmptyState from "../../../../../Components/EmptyState/EmptyState";
import AssessmentForm from "./AssessmentsComponents/AssessmentForm";
import AssessmentItem from "./AssessmentsComponents/AssessmentItem";

export default function Assessments() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

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
                    doSomething={toggleForm}
                    text="Add Assessment"
                />
            </div>

            {isFormOpen && (
                <div ref={targetForm}>
                    <AssessmentForm toggleForm={toggleForm} />
                </div>
            )}

            <AssessmentItem />
            {/* <EmptyState
                imgSrc={"/images/illustrations/empty.svg"}
                text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
            /> */}
        </div>
    );
}
