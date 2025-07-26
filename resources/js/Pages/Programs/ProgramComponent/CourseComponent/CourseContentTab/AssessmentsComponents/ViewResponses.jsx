import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import useAssessmentsStore from "../../../../../../Stores/Programs/CourseContent/assessmentsStore";
import ActivityReponses from "./ViewResponsesComponents/ActivityReponses";
import QuizResponses from "./ViewResponsesComponents/QuizResponses";

export default function ViewResponses() {
    // Assessment store
    const assessmentList = useAssessmentsStore((state) => state.assessmentList);

    const [assessmentDetails, setAssessmentDetails] = useState(null);

    // get the id from url
    const { assessmentId } = usePage().props;
    // temporarily get the data of slected assessment
    useEffect(() => {
        // check if id is true
        if (assessmentId) {
            // find the assessment details in asssessment list based on the id in url
            // this in temporary only as there's currently data passed from backend
            // the data will come from the backend and here's we're it will be set
            const details = assessmentList.find(
                (detail) => detail.id === Number(assessmentId)
            );

            // set the data
            setAssessmentDetails(details);
        }
    }, []);

    return (
        <div className="space-y-5 font-nunito-sans">
            {/* Display responses here */}
            {assessmentDetails &&
                (assessmentDetails.assessmentType === "quiz" ? (
                    <QuizResponses responsesData={assessmentDetails} />
                ) : assessmentDetails.assessmentType === "activity" ? (
                    <ActivityReponses responsesData={assessmentDetails} />
                ) : null)}
        </div>
    );
}
