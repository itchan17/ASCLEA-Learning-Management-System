<?php

use App\Http\Controllers\Programs\OptionController;
use App\Models\Programs\QuestionOption;
use Illuminate\Support\Facades\Route;

Route::prefix('assessments/{assessment}/')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Create the data for the option
        Route::post('quiz-form/{quiz}/questions/{question}/create', [OptionController::class, 'createOption'])->can('createOption', [QuestionOption::class, 'assessment'])->name('assessment.quiz-form.question.option.create');

        // Route for updating the created options
        Route::put('quiz-form/{quiz}/questions/{question}/options/{option}/update', [OptionController::class, 'updateOption'])->can('updateOption', [QuestionOption::class, 'assessment'])->name('assessment.quiz-form.question.option.update');

        // For deleting an option
        Route::delete('quiz-form/{quiz}/questions/{question}/options/{option}/delete', [OptionController::class, 'deleteOption'])->can('deleteOption', [QuestionOption::class, 'assessment'])->name('assessment.quiz-form.question.option.delete');
    });
