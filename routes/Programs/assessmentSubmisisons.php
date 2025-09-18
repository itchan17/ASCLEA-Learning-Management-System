<?php

use App\Http\Controllers\Programs\AssessmentSubmissionController;
use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\Quiz;
use Illuminate\Support\Facades\Route;
use Inertia\EncryptHistoryMiddleware;

Route::prefix('courses/{course}/assessments/{assessment}/quizzes/')
    ->middleware(['auth', 'verified', 'preventBack', EncryptHistoryMiddleware::class])
    ->group(function () {

        // Route for displaying the quiz instructions page
        Route::get('{quiz}/instruction', [AssessmentSubmissionController::class, 'showQuizInstruction'])->can('viewQuizInstruction', [AssessmentSubmission::class, 'assessment', 'course'])->name('assessment.quiz.instruction');

        // Route to display the quiz asnwer form for student
        Route::get('{quiz}/response', [AssessmentSubmissionController::class, 'showQuizAnswerForm'])->can('viewQuizAnswerForm', [AssessmentSubmission::class, 'assessment', 'course'])->name('assessment.quizzes.quiz');

        // Route for validating if required questions was completed
        Route::post('{quiz}/assessment-submission/{assessmentSubmission}/validate', [AssessmentSubmissionController::class, 'validateRequiredQuestions'])->can('validateRequiredQuestion', ['assessmentSubmission', 'assessment', 'course'])->name('assessment.quiz.validate');

        // Route for displaying the submitted page
        Route::get('{quiz}/submitted', [AssessmentSubmissionController::class, 'showSubmittedPage'])->can('viewSubmittedPage', [AssessmentSubmission::class, 'assessment', 'course'])->name('quizzes.quiz.submitted.page');

        // Route for submitting the quiz
        Route::post('{quiz}/assessment-submission/{assessmentSubmission}', [AssessmentSubmissionController::class, 'submitQuiz'])->can('submitQuiz', ['assessmentSubmission', 'assessment'])->name('quizzes.quiz.submit');

        // Route for showing the quiz result 
        Route::get('{quiz}/assessment-submission/{assessmentSubmission}/result', [AssessmentSubmissionController::class, 'showQuizResult'])->can('viewQuizResult', ['assessmentSubmission', 'assessment'])->name('quizzes.quiz.result');
    });
