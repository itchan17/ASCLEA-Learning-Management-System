import React from "react";
import axios from "axios";

export default async function createInitalQuestion(
    assessmentId,
    quizId,
    questionType,
    sortOrder
) {
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
