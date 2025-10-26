import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import useAssessmentsStore from "../../../../../../../../Stores/Programs/CourseContent/assessmentsStore";
import ActivityReponses from "./Components/ActivityReponses";
import QuizResponses from "./Components/QuizResponses";
import BackButton from "../../../../../../../../Components/Button/BackButton";
import { handleClickBackBtn } from "../../../../../../../../Utils/handleClickBackBtn";
import PrimaryButton from "../../../../../../../../Components/Button/PrimaryButton";
import { IoCaretDownOutline } from "react-icons/io5";

export default function ViewResponses({ programId, courseId, assessment }) {
    console.log(programId);
    console.log(courseId);
    console.log(assessment);
    // // Assessment store
    // const assessmentList = useAssessmentsStore((state) => state.assessmentList);

    // const [assessmentDetails, setAssessmentDetails] = useState(null);

    // // get the id from url
    // const { assessmentId } = usePage().props;
    // // temporarily get the data of slected assessment
    // useEffect(() => {
    //     // check if id is true
    //     if (assessmentId) {
    //         // find the assessment details in asssessment list based on the id in url
    //         // this in temporary only as there's currently data passed from backend
    //         // the data will come from the backend and here's we're it will be set
    //         const details = assessmentList.find(
    //             (detail) => detail.id === Number(assessmentId)
    //         );

    //         // set the data
    //         setAssessmentDetails(details);
    //     }
    // }, []);

    return (
        <>
            {/* Display responses here */}
            {assessment &&
                (assessment.assessment_type.assessment_type === "quiz" ? (
                    <QuizResponses />
                ) : (
                    <ActivityReponses />
                ))}
        </>
    );
}
