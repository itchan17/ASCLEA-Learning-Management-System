<?php

namespace App\Services\Programs;

use App\Models\Programs\Question;
use App\Models\Programs\StudentQuizAnswer;

class StudentQuizAnswerService
{
    public function checkAnswer(Question $question, array $answer)
    {
        $studentAnswer = $answer['answer_id'];

        if ($question->question_type === 'identification') {
            $studentAnswer = $answer['answer_text'];
        }

        $option = $question->options()->where('question_option_id', $studentAnswer)->first();

        return $option ? $option->is_correct : false;
    }

    public function createOrUpdateQuestionAnswer(string $assessmentSubmissionId, string $questionId, bool $isAnswerCorrect, array $answer)
    {
        $answer['is_correct'] = $isAnswerCorrect;

        $studentQuizAnswer = StudentQuizAnswer::updateOrCreate(
            ['assessment_submission_id' => $assessmentSubmissionId, 'question_id' => $questionId],
            $answer
        );

        dd($studentQuizAnswer);
    }
}
