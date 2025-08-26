<?php

namespace App\Http\Controllers\Programs;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\SaveQuizRequest;
use App\Models\Programs\Assessment;
use App\Models\Programs\Quiz;
use App\Services\Programs\QuizService;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class QuizController extends Controller
{
    protected QuizService $quizService;

    public function __construct(QuizService $service)
    {
        $this->quizService = $service;
    }

    public function showEditQuizForm(Assessment $assessment, Quiz $quiz)
    {
        // Check if user an view edit quiz form page of teh assessment
        Gate::authorize('viewEditQuizForm',  [Quiz::class, $assessment]);

        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/QuizForm', [
            'assessmentId' => $assessment->assessment_id,
            'quiz' => $this->quizService->getQuizCompleteDetails($quiz),

        ]);
    }

    public function updateQuizDetails(SaveQuizRequest $req, Assessment $assessment, Quiz $quiz)
    {
        $validatedQuizDetails = $req->validated();
        $this->quizService->saveUpdatedQuizDetails($validatedQuizDetails, $quiz);

        return response()->json('Quiz changes was successfully saved.');
    }
}
