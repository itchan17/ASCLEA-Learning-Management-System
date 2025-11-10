<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\Admission\AdmissionFile;
use App\Http\Controllers\Admission\AdmissionFileController;

// Admission Page
Route::get('/admission', [AdmissionFileController::class, 'index'])
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin,student'])
    ->name('admission.index');

// Admin Routes
Route::prefix('admission')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin'])
    ->group(function () {
        // List pending students (with pagination/search)
        Route::get('/pending', [AdmissionFileController::class, 'getPendingStudents'])
            ->name('pending.students');

        // List enrolled, dropout, and withdrawn students
        Route::get('/enrolled', [AdmissionFileController::class, 'getEnrolledStudents'])
            ->name('enrolled.students');

        // View specific pending student
        Route::get('/pending/{student}', [AdmissionFileController::class, 'viewPendingStudent'])
            ->name('pending.student.view');

        // View specific enrolled student
        Route::get('/enrolled/{student}', [AdmissionFileController::class, 'viewEnrolledStudent'])
            ->name('enrolled.student.view');

        // Update student info
        Route::put('/enrolled/{student}', [AdmissionFileController::class, 'updateStudent'])
            ->name('admission.updateStudent');

        // Update admission/enrollment status
        Route::put('/update-status/{id}', [AdmissionFileController::class, 'updateStatus'])
            ->name('admission.updateStatus');

        // Archive Enrolled Student
        Route::delete('/students/{student}/archive', [AdmissionFileController::class, 'archive'])
            ->name('students.archive');

        // Update Student Profile Photo
        Route::put('/students/{student}/update-profile', [AdmissionFileController::class, 'updateProfile'])
            ->name('student.profile.update');

        // Route to stream admission file
        Route::get('/admission/{student}/admission-files/{file}/stream', [AdmissionFileController::class, 'streamAdmissionFile'])
        ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin'])
        ->name('admission.file.stream');

        // Route to download admission file
        Route::get('/admission/{student}/admission-files/{file}/download', [AdmissionFileController::class, 'downloadAdmissionFile'])
            ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin'])
            ->name('admission.file.download');

        // Route to download/Export Pending Students through through CSV    
        Route::get('/admissions/pending/export-csv', [AdmissionFileController::class, 'exportCsv'])
            ->name('admissions.pending.exportCsv');

        // Route to download/Export Pending Students through through PDF
        Route::get('/admissions/pending/export-pdf', [AdmissionFileController::class, 'exportPdf'])
            ->name('admissions.pending.exportPdf');

        // Route to download/Export Enrolled Students through CSV  
        Route::get('/admissions/enrolled/export-csv', [AdmissionFileController::class, 'exportEnrolledCsv'])
            ->name('admissions.enrolled.exportCsv');

        // Route to download/Export Enrolled Students throughPDF 
        Route::get('/admissions/enrolled/export-pdf', [AdmissionFileController::class, 'exportEnrolledPdf'])
            ->name('admissions.enrolled.exportPdf');

    });

//student Routes
Route::prefix('admission')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:student'])
    ->group(function () {

        // Route to upload admission files
        Route::post('/upload-admission-files', [AdmissionFileController::class, 'store'])
            ->middleware(['auth', 'verified', 'preventBack'])
            ->name('admissionfiles.upload');
});
        

