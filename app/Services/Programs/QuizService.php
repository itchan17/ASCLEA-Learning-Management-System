<?php

namespace App\Services\Programs;

use App\Models\Programs\CvOption;
use App\Models\Programs\Quiz;
use Illuminate\Support\Str;

class QuizService
{
    public function getQuizCompleteDetails(Quiz $quiz)
    {
        return $quiz
            ->load([
                'options',
            ]);
    }

    public function saveUpdatedQuizDetails(array $validatedQuizDetails, Quiz $quiz)
    {
        $quiz->update($validatedQuizDetails);

        // Get the quiz options
        $quizOptions = CvOption::where('quiz_id', $quiz->quiz_id)
            ->select('cv_option_id', 'options')
            ->get();

        // Delete all the options of the quiz if cheating mitigation is false
        if (!$validatedQuizDetails['cheating_mitigation']) {
            CvOption::where('quiz_id', $quiz->quiz_id)->delete();
        } else {
            if ($quizOptions->isEmpty() && !empty($validatedQuizDetails['cv_options'])) {

                // If quiz has no options, all new options will be inserted
                foreach ($validatedQuizDetails['cv_options'] as $option) {
                    CvOption::insert([
                        'cv_option_id' => (string) Str::uuid(),
                        'quiz_id' => $quiz->quiz_id,
                        'options' => $option,
                    ]);
                }
            } else if (!$quizOptions->isEmpty() && !empty($validatedQuizDetails['cv_options'])) {

                // Delete options in database that is not in new options
                foreach ($quizOptions as $option) {
                    if (!in_array($option->options, $validatedQuizDetails['cv_options'])) {
                        $option->delete();
                    }
                }

                // Save the new options in database and avoid inserting duplicate
                foreach ($validatedQuizDetails['cv_options'] as $option) {
                    CvOption::insertOrIgnore([
                        'cv_option_id' => (string) Str::uuid(),
                        'quiz_id' => $quiz->quiz_id,
                        'options' => $option,
                    ]);
                }
            }
        }
    }
}
