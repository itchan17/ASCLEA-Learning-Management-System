<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Programs\Quiz;
use App\Services\Programs\QuestionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentSubmissionController extends Controller
{

    protected QuestionService $questionService;

    public function __construct(QuestionService $service)
    {
        $this->questionService = $service;
    }

    public function showQuizInstruction($course, $assessment, Quiz $quiz)
    {
        // Check first if the user already has submission
        // If yes return view reponses page

        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/QuizInstruction', [
            'courseId' => $course,
            'assessmentId' => $assessment,
            'quiz' => $quiz
        ]);
    }

    public function showQuizAnswerForm($course, $assessment, Quiz $quiz)
    {
        // Create submission data first then return it

        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/Components/QuizAnswerForm', [
            'assessmentId' => $assessment,
            'quiz' => $quiz,
            'questions' => $this->questionService->getQuestions($quiz)
        ]);
    }
}
