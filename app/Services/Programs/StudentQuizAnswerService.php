<?php

namespace App\Services\Programs;

use App\Models\Programs\Question;
use App\Models\Programs\QuestionOption;
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
        // If user try to remove their answer, we delete the record of it
        if (is_null($studentAnswer)) {
            StudentQuizAnswer::where('assessment_submission_id', $assessmentSubmissionId)->where('question_id', $questionId)->delete();

            return null;
        } else {
            $answer = ['is_correct' => $isAnswerCorrect];

            if ($questionType === "identification") {
                $answer['answer_text'] = $studentAnswer;
            } else {
                $answer['answer_id'] = $studentAnswer;
                $answer['answer_text'] = QuestionOption::where('question_option_id', $studentAnswer)
                    ->value('option_text');
            }

            return StudentQuizAnswer::updateOrCreate(
                ['assessment_submission_id' => $assessmentSubmissionId, 'question_id' => $questionId],
                $answer
            );
        }
    }

    public function updateAnswerCorrectness(StudentQuizAnswer $studentQuizAnswer, bool $isAnswerCorrect)
    {
        $studentQuizAnswer->update(["is_correct" => $isAnswerCorrect]);
    }

    public function formatInputData(StudentQuizAnswer $studentQuizAnswer)
    {
        return [
            'question' => $studentQuizAnswer->question->question,
            'student_answer' => $studentQuizAnswer->answer_text,
            'correct_answers' => $studentQuizAnswer->question->options->where('is_correct', true)->pluck('option_text')->toArray()
        ];
    }

    public function generateAndSaveStudentPerQuestionFeedback(array $inputData, StudentQuizAnswer $studentQuizAnswer)
    {
        $userContent = $inputData;
        $systemContent = "You are a teaching assistant that gives personalized feedback on student answers. Return the feedback in this structure:\n\n\"feedback\": \"string\"";
        $model = "ft:gpt-4.1-mini-2025-04-14:asclea:student-per-question-feedback:CMRBuDAW";

        $data = AIFeedbackService::getFeedback($userContent, $systemContent, $model);

        // Save the feedback in the assessment submission data
        $studentQuizAnswer->update(['feedback' => $data]);

        return json_decode($studentQuizAnswer->feedback, true);
    }
}
