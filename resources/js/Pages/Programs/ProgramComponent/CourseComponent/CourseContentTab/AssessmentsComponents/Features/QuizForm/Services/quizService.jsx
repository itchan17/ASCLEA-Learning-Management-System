import axios from "axios";

export default async function saveQuizDetails(
    assessmentId,
    quizId,
    quizDetails
) {
    return axios.put(
        route("assessment.quiz-form.update", {
            assessment: assessmentId,
            quiz: quizId,
        }),
        quizDetails
    );
}
