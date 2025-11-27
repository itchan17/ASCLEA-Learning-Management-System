import { useEffect, useState } from "react";
import ActivityReponses from "./Components/ActivityReponses";
import QuizResponses from "./Components/QuizResponses";

export default function ViewResponses({ programId, courseId, assessment }) {
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
