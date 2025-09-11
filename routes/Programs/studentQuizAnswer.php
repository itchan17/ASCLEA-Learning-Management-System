<?php

use App\Http\Controllers\Programs\AssessmentSubmissionController;
use App\Http\Controllers\Programs\StudentQuizAnswerController;
use App\Models\Programs\Quiz;
use Illuminate\Support\Facades\Route;

Route::prefix('courses/{course}/assessment-submission/{assessmentSubmission}/questions/')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route for answering the question
        Route::post('{question}', [StudentQuizAnswerController::class, 'answerQuestion'])->name('assessment.quiz.question.answer');
    });
