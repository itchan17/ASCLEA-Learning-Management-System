<?php

namespace App\Services\Programs;

use App\Models\Programs\Question;
use Illuminate\Support\Str;

class QuestionService
{
    public function createInitalQuestion(string $quizId, array $otherDetails)
    {
        $questiondetails =  [
            'quiz_id' => $quizId,
            'question' => "Question",
            'question_type' => $otherDetails['question_type'],
            'question_points' => 0,
            'sort_order' => $otherDetails['sort_order'],
            'is_required' => false,
        ];

        $question = Question::create($questiondetails)->only(['quiz_id', 'question_id']);;

        return $question;
    }

    public function updateQuestionDetails(Question $question, array $validatedQuestionDetails)
    {
        $question->update($validatedQuestionDetails);
    }
}
