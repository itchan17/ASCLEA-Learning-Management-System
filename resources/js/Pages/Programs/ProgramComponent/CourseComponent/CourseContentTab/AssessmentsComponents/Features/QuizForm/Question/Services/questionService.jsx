import axios from "axios";

export async function createInitalQuestion({
    assessmentId,
    quizId,
    questionType,
    sortOrder,
}) {
    return await axios.post(
        route("assessment.quiz-form.question.create", {
            assessment: assessmentId,
            quiz: quizId,
        }),
        {
            question_type: questionType,
            sort_order: sortOrder,
        }
    );
}

export async function updateQuestion({
    assessmentId,
    quizId,
    questionId,
    questionDetails,
}) {
    return await axios.put(
        route("assessment.quiz-form.question.update", {
            assessment: assessmentId,
            quiz: quizId,
            question: questionId,
        }),
        questionDetails
    );
}

export default {
    createInitalQuestion,
    updateQuestion,
};
