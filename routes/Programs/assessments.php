<?php

use App\Http\Controllers\Programs\AssessmentController;
use App\Models\Course;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('programs/{program}/courses/{course}')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Create assesmsent
        Route::post('/assessment/create', [AssessmentController::class, 'createAssessment'])->name('assessment.create');

        // Route for viewing assessment
        Route::get('/assessments/{assessment}', [AssessmentController::class, 'showAssessment'])->name('program.course.assessment.view');

        // Route for display the edit page of quiz
        Route::get('/quiz-form/{quiz}/edit', [AssessmentController::class, 'showEditQuizForm'])->name('program.course.quiz-form.edit');
    });
