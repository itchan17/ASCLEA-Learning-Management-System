<?php

use App\Http\Controllers\Programs\AssessmentSubmissionController;
use App\Models\Programs\Quiz;
use Illuminate\Support\Facades\Route;

Route::prefix('courses/{course}/assessments/{assessment}/quizzes/')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route for displaying the quiz instructions page
        Route::get('{quiz}/instruction', [AssessmentSubmissionController::class, 'showQuizInstruction'])->name('assessment.quiz.instruction');

        // Route to display the quiz asnwer form for student
        Route::get('{quiz}/response', [AssessmentSubmissionController::class, 'showQuizAnswerForm'])->name('assessment.quizzes.quiz');

        Route::get('{quiz}/submitted', [AssessmentSubmissionController::class, 'showSubmittedPage'])->name('quizzes.quiz.submitted.page');
    });
