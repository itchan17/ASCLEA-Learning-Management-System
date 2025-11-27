<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Programs\Assessment;
use App\Models\Programs\Question;
use App\Models\Programs\QuestionOption;
use App\Services\Programs\OptionService;
use Illuminate\Http\Request;

class OptionController extends Controller
{

    protected OptionService $optionService;

    public function __construct(OptionService $service)
    {
        $this->optionService = $service;
    }

    public function createOption(Assessment $assessment, $quiz, Question $question)
    {
        $newOption = $this->optionService->createOption($question->question_type, $question->question_id);

        return response()->json(['success' => 'New option created successfully.', 'option' => $newOption]);
    }



    public function updateOption(Request $req, Assessment $assessment, $quiz, $question, QuestionOption $option)
    {
        $validated = $req->validate(['option_text' => 'required|string', 'is_correct' => 'required|boolean']);

        $this->optionService->updateOptionName($option,  $validated);

        return response()->json("Option udpated successfully");
    }

    public function deleteOption(Assessment $assessment, $quiz, $question, QuestionOption $option)
    {
        $this->optionService->deleteOption($option);

        return response()->json("Option deleted successfully");
    }
}
