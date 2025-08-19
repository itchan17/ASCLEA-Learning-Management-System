import { useState, useRef, useEffect } from "react";
import PrimaryButton from "../../../../../Components/Button/PrimaryButton";
import EmptyState from "../../../../../Components/EmptyState/EmptyState";
import AssessmentForm from "./AssessmentsComponents/AssessmentForm";
import AssessmentItem from "./AssessmentsComponents/AssessmentItem";
import useAssessmentsStore from "../../../../../Stores/Programs/CourseContent/assessmentsStore";
import RoleGuard from "../../../../../Components/Auth/RoleGuard";
import { usePage, WhenVisible } from "@inertiajs/react";
import Loader from "../../../../../Components/Loader";

export default function Assessments() {
    const {
        data: assessments,
        current_page: currentPage,
        last_page: lastPage,
    } = usePage().props.assessments;

    console.log(`COurrentPage: ${currentPage} LastPage: ${lastPage}`);
    // Assessments Store
    // const isFormOpen = useAssessmentsStore((state) => state.isFormOpen);
    // const toggleAssessmentForm = useAssessmentsStore(
    //     (state) => state.toggleAssessmentForm
    // );
    const assessmentList = useAssessmentsStore((state) => state.assessmentList);
    const setAssessmentList = useAssessmentsStore(
        (state) => state.setAssessmentList
    );

    const [isAssessmentFormOpen, setIsAssessmentFormOpen] = useState(false);

    useEffect(() => {
        console.log("RENDER ASSESSMENT");
    }, []);

    useEffect(() => {
        if (currentPage === 1) {
            setAssessmentList([...assessments]);
        } else {
            const assmnts = [...assessmentList, ...assessments];
            // Map handle remove duplicate values based on the assessment id
            const uniqueAssessments = [
                ...new Map(assmnts.map((a) => [a.assessment_id, a])).values(),
            ];

            setAssessmentList(uniqueAssessments);
        }
    }, [assessments]);

    const targetForm = useRef(null);

    // Scroll into the form once opened
    useEffect(() => {
        if (isAssessmentFormOpen) {
            targetForm.current?.scrollIntoView({ behavior: "smooth" });
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
                    <AssessmentForm toggleForm={toggleAssessmentForm} />
                </div>
            )}

            {/* <AssessmentItem /> */}
            {assessmentList.length > 0 ? (
                assessmentList.map((assessment, i) => (
                    <AssessmentItem
                        setIsAssessmentFormOpen={setIsAssessmentFormOpen}
                        key={assessment.assessment_id}
                        assessmentDetails={assessment}
                    />
                ))
            ) : (
                <EmptyState
                    imgSrc={"/images/illustrations/empty.svg"}
                    text={`“There’s a whole lot of nothing going on—time to make something happen!”`}
                />
            )}

            {currentPage < lastPage && (
                <WhenVisible
                    params={{
                        data: {
                            page: currentPage + 1,
                        },
                        preserveUrl: true,
                        preserveScroll: false,
                        only: ["assessments"],
                    }}
                    always
                >
                    <div className=" w-full flex justify-center">
                        <Loader color="bg-ascend-blue" />
                    </div>
                </WhenVisible>
            )}
        </div>
    );
}
