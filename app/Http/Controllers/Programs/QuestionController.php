<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\QuestionRequest;
use App\Models\Programs\Assessment;
use App\Models\Programs\Question;
use App\Services\Programs\QuestionService;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    protected QuestionService $questionService;

    public function __construct(QuestionService $service)
    {
        $this->questionService = $service;
    }

    public function createQuestion(QuestionRequest $req, Assessment $assessment, $quiz)
    {
        $validated = $req->validated();

        $newQuestion = $this->questionService->createInitalQuestion($quiz, $validated);

        return response()->json(['success' => 'New question created successfully.', 'data' => $newQuestion]);
    }

    public function updateQuestion(QuestionRequest $req, Assessment $assessment, $quiz, Question $question)
    {
        $validated = $req->validated();

        $this->questionService->updateQuestionDetails($question, $validated);

        return response()->json("Question updated successfully.");
    }
}
