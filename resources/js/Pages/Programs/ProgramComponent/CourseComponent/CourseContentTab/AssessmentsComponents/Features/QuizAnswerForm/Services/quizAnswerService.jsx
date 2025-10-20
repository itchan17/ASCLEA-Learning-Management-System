import axios from "axios";

export default async function saveAnswer({
    courseId,
    assessmentSubmissionId,
    questionId,
    answer,
}) {
    return axios.post(
        route("assessment.quiz.question.answer", {
            course: courseId,
            assessmentSubmission: assessmentSubmissionId,
            question: questionId,
        }),
        { answer }
    );
}
