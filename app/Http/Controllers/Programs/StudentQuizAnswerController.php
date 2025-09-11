<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
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

    public function answerQuestion(Request $request, $course, $assessmentSubmission, Question $question)
    {
        $validated = $request->validate([
            'answer_id' => 'nullable|string',
            'answer_text' => 'nullable|string',
        ]);

        $isAnswerCorrect = $this->studentQuizAnswerService->checkAnswer($question, $validated);

        $this->studentQuizAnswerService->createOrUpdateQuestionAnswer($assessmentSubmission, $question->question_id, $isAnswerCorrect, $validated);

        dd($isAnswerCorrect);
    }
}
