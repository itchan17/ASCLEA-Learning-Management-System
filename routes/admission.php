<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admission')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin'])
    ->group(function () {
        Route::get('/', function () {
            return Inertia::render('Admission/AdmissionPage');
        });

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
        

