<?php

use App\Http\Controllers\Programs\AssessmentSubmissionController;
use App\Http\Controllers\Programs\StudentQuizAnswerController;
use App\Models\Programs\Quiz;
use App\Models\Programs\StudentQuizAnswer;
use Illuminate\Support\Facades\Route;

Route::prefix('courses/{course}/assessment-submission/{assessmentSubmission}/questions/')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route for answering the question
        Route::post('{question}', [StudentQuizAnswerController::class, 'answerQuestion'])->can('answerQuestion', [StudentQuizAnswer::class, 'assessmentSubmission'])->name('assessment.quiz.question.answer');

        // Route for marking answer correct or incorrect
        Route::put('{question}/student-answers/{studentQuizAnswer}', [StudentQuizAnswerController::class, 'markAnswerCorrectIncorrect'])->can('updateQuestionAnswer', [StudentQuizAnswer::class, 'assessmentSubmission'])->name('assessment.quiz.question.answer.update');

        // Route gor generaiting feedback for each question
        Route::post('{question}/student-answers/{studentQuizAnswer}/ai/feedback', [StudentQuizAnswerController::class, 'questionAnswerFeedback'])->can('generateQuestionFeedback', [StudentQuizAnswer::class, 'assessmentSubmission'])->name('generate.question.answer.feedback');
    });
