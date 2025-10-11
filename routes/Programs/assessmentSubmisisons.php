<?php

use App\Http\Controllers\Programs\AssessmentSubmissionController;
use App\Http\Middleware\EnsureValidChildParentModel;
use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\Quiz;
use Illuminate\Support\Facades\Route;
use Inertia\EncryptHistoryMiddleware;


Route::prefix('courses/{course}/assessments/{assessment}/')
    ->middleware(['auth', 'verified', 'preventBack', EncryptHistoryMiddleware::class, EnsureValidChildParentModel::class])
    ->group(function () {

        // Route for displaying the quiz instructions page
        Route::get('quizzes/{quiz}/instruction', [AssessmentSubmissionController::class, 'showQuizInstruction'])->can('viewQuizInstruction', [AssessmentSubmission::class, 'assessment', 'course'])->name('assessment.quiz.instruction');

        // Route to display the quiz asnwer form for student
        Route::get('quizzes/{quiz}/response', [AssessmentSubmissionController::class, 'showQuizAnswerForm'])->can('viewQuizAnswerForm', [AssessmentSubmission::class, 'assessment', 'course'])->name('assessment.quizzes.quiz');

        // Route for validating if required questions was completed
        Route::post('quizzes/{quiz}/assessment-submissions/{assessmentSubmission}/validate', [AssessmentSubmissionController::class, 'validateRequiredQuestions'])->can('validateRequiredQuestion', ['assessmentSubmission', 'assessment', 'course'])->name('assessment.quiz.validate');

        // Route for displaying the submitted page
        Route::get('quizzes/{quiz}/submitted', [AssessmentSubmissionController::class, 'showSubmittedPage'])->can('viewSubmittedPage', [AssessmentSubmission::class, 'assessment', 'course'])->name('quizzes.quiz.submitted.page');

        // Route for submitting the quiz
        Route::post('quizzes/{quiz}/assessment-submissions/{assessmentSubmission}', [AssessmentSubmissionController::class, 'submitQuiz'])->can('submitQuiz', ['assessmentSubmission', 'assessment'])->name('quizzes.quiz.submit');

        // Route for showing the quiz result 
        Route::get('quizzes/{quiz}/assessment-submissions/{assessmentSubmission}/result', [AssessmentSubmissionController::class, 'showQuizResult'])->can('viewQuizResult', ['assessmentSubmission', 'assessment', 'quiz'])->name('quizzes.quiz.result');

        // Route for showing the quiz result 
        Route::post('quizzes/{quiz}/assessment-submissions/{assessmentSubmission}/result/ai/feedback', [AssessmentSubmissionController::class, 'quizResultFeedback'])->can('generateQuizResultFeedback', 'assessmentSubmission')->name('generate.quiz.result.feedback');

        // Route for uploading activity files
        Route::put('activity/files', [AssessmentSubmissionController::class, 'uploadActivityFiles'])->name('upload.activity.files');

        // Route for displaying the activity files
        Route::get('activity-files/{file}/stream', [AssessmentSubmissionController::class, "streamAcitvityFiles"])->name('activity.file.stream');

        // Route for deleting the uploaded activity files
        Route::delete('assessment-submissions/{assessmentSubmission}/activity-files/{file}', [AssessmentSubmissionController::class, "removeUploadedFile"])->name('activity.file.remove');

        // Route for submitting the activity
        Route::put('activity/submit', [AssessmentSubmissionController::class, 'submitActivity'])->name('activity.submit');

        // Route for submitting the activity
        Route::put('assessment-submissions/{assessmentSubmission}/activity/grade', [AssessmentSubmissionController::class, 'gradeActivity'])->name('grade.activity');

        // Route for submitting the activity
        Route::put('/activity/return', [AssessmentSubmissionController::class, 'returnActivity'])->name('return.activity');
    });
