<?php

namespace App\Services\Programs;

use App\Models\Programs\Question;
use App\Models\Programs\QuestionOption;
use Illuminate\Support\Str;

class QuestionService
{
    public function createInitalQuestion(string $quizId, array $otherDetails)
    {
        $data = [];

        $questiondetails =  [
            'quiz_id' => $quizId,
            'question' => "Question",
            'question_type' => $otherDetails['question_type'],
            'question_points' => 0,
            'sort_order' => $otherDetails['sort_order'],
            'is_required' => false,
        ];

        $question = Question::create($questiondetails)->only(['quiz_id', 'question_id']);

        $data['question'] =  $question;

        // Create the intial option for the question
        if ($otherDetails['question_type'] === 'multiple_choice') {

            // Initally create the option for a multiple choice
            $data['options'] = QuestionOption::create([
                'question_id' => $question['question_id'],
                'option_name' => 'Option 1'
            ])->only(['question_option_id', 'question_id']);
        }

        return $data;
    }

    public function updateQuestionDetails(Question $question, array $validatedQuestionDetails)
    {
        $question->update($validatedQuestionDetails);
    }

    public function updateOptionName(QuestionOption $option, array $validatedUpdatedOption)
    {
        $option->update($validatedUpdatedOption);
    }
}
