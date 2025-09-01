import React from "react";
import axios from "axios";

export default function useQuestionService({ assessmentId, quizId }) {
    const createInitalQuestion = async (questionType, sortOrder) => {
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
    };

    const updateQuestion = async (questionId, questionDetails) => {
        return await axios.put(
            route("assessment.quiz-form.question.update", {
                assessment: assessmentId,
                quiz: quizId,
                question: questionId,
            }),
            questionDetails
        );
    };

    return { createInitalQuestion, updateQuestion };
}
