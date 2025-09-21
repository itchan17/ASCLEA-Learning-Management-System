import { useState } from "react";
import QuizAnswerFormNav from "./QuizAnswerFormNav";
import QuestionResultItem from "./QuestionResultItem";
import useQuizResult from "../Hooks/useQuizResult";
import StudentQuizDetails from "./StudentQuizDetails";
import ResultFeedback from "./ResultFeedback";
import RoleGuard from "../../../../../../../../../Components/Auth/RoleGuard";

export default function QuizResult({
    courseId,
    assessmentId,
    quiz,
    questions,
    assessmentSubmission,
    auth,
    prevQuizAssessmentSubmitted,
    studentData,
}) {
    console.log(auth);
    return (
        <div className="font-nunito-sans space-y-5">
            <QuizAnswerFormNav />

            <main className="flex justify-center px-5 pb-5 lg:px-[150px]">
                <div className="w-full max-w-235 space-y-5">
                    <RoleGuard allowedRoles={["student"]}>
                        <ResultFeedback
                            quiz={quiz}
                            assessmentSubmission={assessmentSubmission}
                        />
                    </RoleGuard>

                    <RoleGuard allowedRoles={["admin", "faculty"]}>
                        <StudentQuizDetails
                            assessmentSubmission={assessmentSubmission}
                            prevQuizAssessmentSubmitted={
                                prevQuizAssessmentSubmitted
                            }
                            studentData={studentData}
                            quiz={quiz}
                        />
                    </RoleGuard>

                    {/* Questions here */}

                    {questions &&
                        questions.length > 0 &&
                        questions.map((question) => (
                            <QuestionResultItem
                                key={question.question_id}
                                courseId={courseId}
                                assessmentSubmission={assessmentSubmission}
                                questionDetails={question}
                            />
                        ))}
                </div>
            </main>
        </div>
    );
}

QuizResult.layout = null;
