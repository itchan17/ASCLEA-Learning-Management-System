<?php

namespace App\Services\Programs;

use App\Models\Programs\Question;
use App\Models\Programs\QuestionOption;
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

        return Question::create($questiondetails)->only(['quiz_id', 'question_id']);
    }

    public function updateQuestionDetails(Question $question, array $validatedQuestionDetails)
    {
        $question->update($validatedQuestionDetails);
    }

    public function createOption(string $questionType, string $questionId)
    {
        $optionCount = QuestionOption::where('question_id', $questionId)->count();

        // Create the intial option for the question
        if ($questionType === 'multiple_choice') {

            // Initially create the option for a multiple choice
            return QuestionOption::create([
                'question_id' => $questionId,
                'option_name' => 'Option ' . $optionCount + 1 // Dynamically add the options number based on the option count
            ])->only(['question_option_id', 'question_id']);
        }
    }

    public function updateOptionName(QuestionOption $option, array $validatedUpdatedOption)
    {
        $option->update($validatedUpdatedOption);
    }

    public function deleteOption(QuestionOption $option)
    {
        $option->delete();
    }
}
