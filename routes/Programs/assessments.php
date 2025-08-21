<?php

use App\Http\Controllers\Programs\AssessmentController;
use App\Models\Course;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('programs/{program}/courses/{course}')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {


        // Create assesmsent
        Route::post('/assessments/create', [AssessmentController::class, 'createAssessment'])->name('assessment.create');

        // Get assessments
        Route::get('/assessments', [AssessmentController::class, 'listAssessments'])->name('program.course.assessments');

        // Route for viewing assessment
        Route::get('/assessments/{assessment}', [AssessmentController::class, 'showAssessment'])->name('program.course.assessment.view');

        // Route for display the edit page of quiz
        Route::get('/quiz-form/{quiz}/edit', [AssessmentController::class, 'showEditQuizForm'])->name('program.course.quiz-form.edit');

        // Update assessment
        Route::put('/assessments/{assessment}/update', [AssessmentController::class, 'updateAssessment'])->name('assessment.update');

        // Unppulsh assessment
        Route::put('/assessments/{assessment}/unpublish', [AssessmentController::class, 'unPublishAssessment'])->name('assessment.unpublish');

        // Delete assessment
        Route::delete('/assessments/{assessment}/archive', [AssessmentController::class, 'archiveAssessment'])->name('assessment.archive');

        // Delete assessment
        Route::put('/assessments/{assessment}/restore', [AssessmentController::class, 'restoreAssessment'])->name('assessment.restore');
    });
