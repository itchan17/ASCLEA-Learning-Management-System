import { useState, useEffect } from "react";
import StudentQuizDetails from "./StudentQuizDetails";
import ViewEvidence from "./ViewEvidence";
import { usePage } from "@inertiajs/react";
import QuizResponsesSummary from "./QuizResponsesSummary";
import QuizResponsesFMQ from "./QuizResponsesFMQ";
import QuizResponsesTable from "./QuizResponsesTable";
import QuizReponsesFeedback from "./QuizReponsesFeedback";

export default function QuizReponses() {
    const {
        programId,
        courseId,
        assessment,
        summary,
        frequentlyMissedQuestions,
        responses,
    } = usePage().props;

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
    const [
        frequentlyMissedQuestionsWithColors,
        setFrequentlyMissedQuestionsWithColors,
    ] = useState(null);

    function getRandomColor() {
        return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
    }

    useEffect(() => {
        if (frequentlyMissedQuestions.length > 0) {
            setFrequentlyMissedQuestionsWithColors(
                frequentlyMissedQuestions.map((question) => {
                    return { ...question, color: getRandomColor() };
                })
            );
        }
    }, []);

    return (
        <div className="space-y-5 font-nunito-sans">
            <div className="w-full min-w-0">
                <h1 className="text-size6 break-words font-semibold">
                    {assessment.assessment_title}
                </h1>
                <div className="space-x-5">
                    <span className="font-medium">
                        {/* Possible Points: {assessment.assessmentPoints} */}
                        Total Points: {assessment.quiz.quiz_total_points}
                    </span>
                    <span className="font-medium">
                        {/* Response Received: {responsesData.responseReceived} */}
                        Responses Received:{" "}
                        {assessment.assessment_submissions_count}
                    </span>
                </div>
            </div>

            {/* Summary */}
            <QuizResponsesSummary summary={summary} assessment={assessment} />

            {/* Frequently Missed Questions */}
            <QuizResponsesFMQ
                frequentlyMissedQuestions={frequentlyMissedQuestions}
                frequentlyMissedQuestionsWithColors={
                    frequentlyMissedQuestionsWithColors
                }
            />

            {/* Feedback */}
            <QuizReponsesFeedback />

            {/* Table */}
            <QuizResponsesTable
                programId={programId}
                courseId={courseId}
                assessment={assessment}
                responses={responses}
            />

            {isDetailsOpen && (
                <StudentQuizDetails setIsDetailsOpen={setIsDetailsOpen} />
            )}

            {isEvidenceOpen && (
                <ViewEvidence setIsEvidenceOpen={setIsEvidenceOpen} />
            )}
        </div>
    );
}
