<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\QuestionRequest;
use App\Models\Programs\Assessment;
use App\Models\Programs\Question;
use App\Models\Programs\QuestionOption;
use App\Services\Programs\QuestionService;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    protected QuestionService $questionService;

    public function __construct(QuestionService $service)
    {
        $this->questionService = $service;
    }

    public function createQuestion(QuestionRequest $req, $assessment, $quiz)
    {
        $validated = $req->validated();

        $newQuestion = $this->questionService->createInitialQuestion($quiz, $validated);

        // Creates the inital option of the question
        // We dontneed to create inital option for identification
        $initialOption = null;
        if ($validated['question_type'] !== "identification") {
            $initialOption  = $this->questionService->createOption($validated['question_type'], $newQuestion['question_id']);
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

    public function createOption($assessment, $quiz, Question $question)
    {
        $newOption = $this->questionService->createOption($question->question_type, $question->question_id);

        return response()->json(['success' => 'New option created successfully.', 'option' => $newOption]);
    }



    public function updateOption(Request $req, $assessment, $quiz, $question, QuestionOption $option)
    {
        $validated = $req->validate(['option_text' => 'required|string', 'is_correct' => 'required|boolean']);

        $this->questionService->updateOptionName($option,  $validated);

        return response()->json("Option udpated successfully");
    }

    public function deleteOption($assessment, $quiz, $question, QuestionOption $option)
    {
        $this->questionService->deleteOption($option);

        return response()->json("Option deleted successfully");
    }
}
