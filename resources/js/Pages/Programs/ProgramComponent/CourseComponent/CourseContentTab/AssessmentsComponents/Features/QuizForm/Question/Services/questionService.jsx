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

export async function deleteQuestion({ assessmentId, quizId, questionId }) {
    return await axios.delete(
        route("assessment.quiz-form.question.delete", {
            assessment: assessmentId,
            quiz: quizId,
            question: questionId,
        })
    );
}

export async function reorderQuestion({
    assessmentId,
    quizId,
    questionId,
    newPos,
    originalPos,
}) {
    return await axios.put(
        route("assessment.quiz-form.question.reorder", {
            assessment: assessmentId,
            quiz: quizId,
            question: questionId,
        }),
        { newSortOrder: newPos + 1, origSortOrder: originalPos + 1 } // newPos is an an index, so we should add 1 since sort order is not 0 based
    );
}

export default {
    createInitalQuestion,
    updateQuestion,
    deleteQuestion,
    reorderQuestion,
};
