<?php

use App\Http\Controllers\Programs\AssessmentResponseController;
use App\Models\Programs\Assessment;
use Illuminate\Support\Facades\Route;

Route::prefix('programs/{program}/courses/{course}')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route for viewing assessment responses
        Route::get('/assessments/{assessment}/responses', [AssessmentResponseController::class, 'showAssessmentResponse'])->name('assessment.responses.view');
    });
