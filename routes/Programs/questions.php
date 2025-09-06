<?php

use App\Http\Controllers\Programs\QuestionController;
use App\Models\Programs\Question;
use Illuminate\Support\Facades\Route;

Route::prefix('assessments/{assessment}/')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route for creating question
        Route::post('quiz-form/{quiz}/questions/create', [QuestionController::class, 'createQuestion'])->can('createQuestion', [Question::class, 'assessment'])->name('assessment.quiz-form.question.create');

        // Route for updating quesiton details
        Route::put('quiz-form/{quiz}/questions/{question}/update', [QuestionController::class, 'updateQuestion'])->can('updateQuestion', [Question::class, 'assessment'])->name('assessment.quiz-form.question.update');

        // Route for deleting question
        Route::delete('quiz-form/{quiz}/questions/{question}/delete', [QuestionController::class, 'deleteQuestion'])->can('deleteQuestion', [Question::class, 'assessment'])->name('assessment.quiz-form.question.delete');
    });
