<?php

use App\Http\Controllers\Programs\QuestionController;
use App\Http\Controllers\Programs\QuizController;
use Illuminate\Support\Facades\Route;

Route::prefix('assessments/{assessment}/')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route to display the edit page of quiz
        Route::get('quiz-form/{quiz}/edit', [QuizController::class, 'showEditQuizForm'])->name('assessment.quiz-form.edit');

        // Route for updating quiz details
        Route::put('quiz-form/{quiz}/update', [QuizController::class, 'updateQuizDetails'])->name('assessment.quiz-form.update');
    });
