<?php

use App\Http\Controllers\Programs\QuizController;
use Illuminate\Support\Facades\Route;

Route::prefix('programs/{program}/courses/{course}/assessments/{assessment}/')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route for display the edit page of quiz
        Route::get('quiz-form/{quiz}/edit', [QuizController::class, 'showEditQuizForm'])->name('program.course.quiz-form.edit');

        // Route for display the edit page of quiz
        Route::put('quiz-form/{quiz}/update', [QuizController::class, 'updateQuizDetails'])->name('assessment.quiz-form.update');
    });
