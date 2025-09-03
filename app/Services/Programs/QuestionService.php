<?php

namespace App\Services\Programs;

use App\Models\Programs\Question;
use App\Models\Programs\QuestionOption;


class QuestionService
{
    public function createInitialQuestion(string $quizId, array $otherDetails)
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
            $newOption = QuestionOption::create([
                'question_id' => $questionId,
                'option_text' => 'Option ' . $optionCount + 1, // Dynamically add the options number based on the option count
                'option_order' => $optionCount + 1
            ])->only(['question_option_id', 'question_id']);

            return [$newOption];
        } else if ($questionType === "true_or_false") {

            $options = [
                [
                    'question_id' => $questionId,
                    'option_text' => "True",
                    'option_order' => 1,
                ],
                [
                    'question_id' => $questionId,
                    'option_text' => "False",
                    'option_order' => 2,
                ]
            ];

            $newOptions = [];

            foreach ($options as $option) {
                $newOptions[] =  QuestionOption::create($option)->only(['question_option_id', 'question_id']);
            }

            return $newOptions;
        } else if ($questionType === "identification") {
            // Initially create the crrect answer for a multiple choice
            $newCorrectAnswer = QuestionOption::create([
                'question_id' => $questionId,
                'option_text' => 'Correct Answer ' . $optionCount + 1,
                'option_order' => $optionCount + 1,
                'is_correct' => true, // Alwasy set the correct asnwer true
            ])->only(['question_option_id', 'question_id']);

            return [$newCorrectAnswer];
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
