<?php

use App\Http\Controllers\Programs\QuestionController;
use App\Http\Controllers\Programs\QuizController;
use Illuminate\Support\Facades\Route;

Route::prefix('assessments/{assessment}/')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route for display the edit page of quiz
        Route::get('quiz-form/{quiz}/edit', [QuizController::class, 'showEditQuizForm'])->name('assessment.quiz-form.edit');

        // Route for display the edit page of quiz
        Route::put('quiz-form/{quiz}/update', [QuizController::class, 'updateQuizDetails'])->name('assessment.quiz-form.update');

        // Route for display the edit page of quiz
        Route::post('quiz-form/{quiz}/questions/create', [QuestionController::class, 'createQuestion'])->name('assessment.quiz-form.question.create');

        // Route for display the edit page of quiz
        Route::put('quiz-form/{quiz}/questions/{question}/update', [QuestionController::class, 'updateQuestion'])->name('assessment.quiz-form.question.update');

        // Create the data for the option
        Route::post('quiz-form/{quiz}/questions/{question}/create', [QuestionController::class, 'createOption'])->name('assessment.quiz-form.question.option.create');

        // Route for updating the created options
        Route::put('quiz-form/{quiz}/questions/{question}/options/{option}update', [QuestionController::class, 'updateOption'])->name('assessment.quiz-form.question.option.update');

        // For deleting an option
        Route::delete('quiz-form/{quiz}/questions/{question}/options/{option}delete', [QuestionController::class, 'deleteOption'])->name('assessment.quiz-form.question.option.delete');
    });
