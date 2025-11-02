<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admission\AdmissionFileController;

Route::get('/admission', function () {
            return Inertia::render('Admission/AdmissionPage');
        })->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin,student']);

Route::prefix('admission')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin'])
    ->group(function () {
        // Route for selected applicant to view their admission details
        Route::get('/pending/{applicantId}', function ($applicantId) {
            return Inertia::render('Admission/PendingPage/EnrollmentRequest', [
                'applicantId' => $applicantId,
            ]);
        })->name('pending.applicant.view');

        // Route for selected enrolled student to view their information
        Route::get('/enrolled/{studentid}', function ($studentid) {
            return Inertia::render('Admission/EnrolledPage/StudentInfo', [
                'studentid' => $studentid,
            ]);
        })->name('enrolled.student.view');

});


//student view
Route::prefix('admission')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:student'])
    ->group(function () {

        // Route to upload admission files
        Route::post('/upload-admission-files', [AdmissionFileController::class, 'store'])
            ->middleware(['auth', 'verified', 'preventBack'])
            ->name('admissionfiles.upload');
});
        

