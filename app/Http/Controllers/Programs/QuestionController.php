<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\QuestionRequest;
use App\Models\Programs\Question;
use App\Services\Programs\OptionService;
use App\Services\Programs\QuestionService;

class QuestionController extends Controller
{
    protected QuestionService $questionService;
    protected OptionService $optionsService;

    public function __construct(QuestionService $questionService, OptionService $optionService)
    {
        $this->questionService = $questionService;
        $this->optionsService = $optionService;
    }

    public function createQuestion(QuestionRequest $req, $assessment, $quiz)
    {
        $validated = $req->validated();

        $newQuestion = $this->questionService->createInitialQuestion($quiz, $validated);

        // Creates the inital option of the question
        // We dontneed to create inital option for identification
        $initialOption = null;
        if ($validated['question_type'] !== "identification") {
            $initialOption  = $this->optionsService->createOption($validated['question_type'], $newQuestion['question_id']);
        }

        // Merge the IDs of the question and the option and send to client
        $data = [
            'question' => $newQuestion,
            'options' => $initialOption
        ];

        return response()->json(['success' => 'New question created successfully.', 'data' => $data]);
    }

    public function updateQuestion(QuestionRequest $req, $assessment, $quiz, Question $question)
    {
        $validated = $req->validated();

        $this->questionService->updateQuestionDetails($question, $validated);

        return response()->json("Question updated successfully.");
    }

    public function deleteQuestion(QuestionRequest $req, $assessment, $quiz, Question $question)
    {
        $validated = $req->validated();

        $this->questionService->deleteQuestions($question);

        return response()->json("Question deeleted successfully.");
    }
}
