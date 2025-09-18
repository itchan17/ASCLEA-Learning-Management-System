<?php

namespace App\Services\Programs;

use App\Models\Programs\Question;
use App\Models\Programs\StudentQuizAnswer;

class StudentQuizAnswerService
{
    public function checkAnswer(Question $question, ?string $answer)
    {
        if (is_null($answer)) return false;

        // Get the right option from the question
        $option = $question->options()->where(function ($q) use ($answer) {
            $q->where('question_option_id', $answer)->orWhere('option_text', $answer);
        })->first();

        return $option ? $option->is_correct : false;
    }

    public function createOrUpdateQuestionAnswer(string $assessmentSubmissionId, string $questionId, bool $isAnswerCorrect, ?string $studentAnswer, string $questionType)
    {
        if (is_null($studentAnswer)) {
            StudentQuizAnswer::where('assessment_submission_id', $assessmentSubmissionId)->where('question_id', $questionId)->delete();

            return null;
        } else {
            $answer = ['is_correct' => $isAnswerCorrect];

            if ($questionType === "identification") {
                $answer['answer_text'] = $studentAnswer;
            } else {
                $answer['answer_id'] = $studentAnswer;
            }

            return StudentQuizAnswer::updateOrCreate(
                ['assessment_submission_id' => $assessmentSubmissionId, 'question_id' => $questionId],
                $answer
            );
        }
    }
}
