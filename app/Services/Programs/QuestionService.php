<?php

namespace App\Services\Programs;

use App\Models\Programs\Question;
use App\Models\Programs\QuestionOption;


class QuestionService
{
    public function createInitialQuestion(string $quizId, array $otherDetails)
    {
        $questionCount = Question::where('quiz_id', $quizId)->count();

        $questiondetails =  [
            'quiz_id' => $quizId,
            'question' => "Question",
            'question_type' => $otherDetails['question_type'],
            'question_points' => 0,
            'sort_order' => $questionCount + 1,
            'is_required' => false,
        ];

        return Question::create($questiondetails)->only(['quiz_id', 'question_id']);
    }

    public function updateQuestionDetails(Question $question, array $validatedQuestionDetails)
    {
        $question->update($validatedQuestionDetails);
    }

    public function deleteQuestions(Question $question)
    {
        $question->delete();
    }
}
