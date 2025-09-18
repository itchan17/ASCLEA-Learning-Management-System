<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\Question;
use App\Services\Programs\StudentQuizAnswerService;
use Illuminate\Http\Request;

class StudentQuizAnswerController extends Controller
{

    protected StudentQuizAnswerService $studentQuizAnswerService;

    public function __construct(StudentQuizAnswerService $service)
    {
        $this->studentQuizAnswerService = $service;
    }

    public function answerQuestion(Request $request, $course, AssessmentSubmission $assessmentSubmission, Question $question)
    {
        $validated = $request->validate([
            'answer' => 'nullable|string',
        ]);

        $isAnswerCorrect = $this->studentQuizAnswerService->checkAnswer($question, $validated['answer']);

        $answer = $this->studentQuizAnswerService->createOrUpdateQuestionAnswer($assessmentSubmission->assessment_submission_id, $question->question_id, $isAnswerCorrect, $validated['answer'], $question->question_type);

        return response()->json(['message' => "Question answered sucessfully.", 'answer' => $answer ? $answer->only(['student_quiz_answer_id', 'assessment_submission_id', 'question_id', 'answer_id', 'answer_text']) : null]);
    }
}
