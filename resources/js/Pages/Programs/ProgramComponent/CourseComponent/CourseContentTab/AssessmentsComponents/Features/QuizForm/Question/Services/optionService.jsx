import axios from "axios";

export async function addOption({ assessmentId, quizId, questionId }) {
    return await axios.post(
        route("assessment.quiz-form.question.option.create", {
            assessment: assessmentId,
            quiz: quizId,
            question: questionId,
        })
    );
}

export async function updateOption({
    assessmentId,
    quizId,
    questionId,
    optionId,
    updatedOptionDetails,
}) {
    return await axios.put(
        route("assessment.quiz-form.question.option.update", {
            assessment: assessmentId,
            quiz: quizId,
            question: questionId,
            option: optionId,
        }),
        updatedOptionDetails
    );
}

export async function deleteOption({
    assessmentId,
    quizId,
    questionId,
    optionId,
}) {
    return await axios.delete(
        route("assessment.quiz-form.question.option.delete", {
            assessment: assessmentId,
            quiz: quizId,
            question: questionId,
            option: optionId,
        })
    );
}

export default {
    addOption,
    updateOption,
};
