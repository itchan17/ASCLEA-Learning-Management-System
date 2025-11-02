<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\Admission\AdmissionFile;
use App\Http\Controllers\Admission\AdmissionFileController;

Route::get('/admission', function () {
    $pendingStudents = Student::with('user')
        ->where('enrollment_status', 'pending')
        ->get(['student_id', 'user_id', 'enrollment_status', 'created_at']);

    $enrolledStudents = Student::with('user')
        ->where('enrollment_status', 'enrolled')
        ->get(['student_id', 'user_id', 'enrollment_status', 'created_at']);

    return Inertia::render('Admission/AdmissionPage', [
        'pendingStudents' => $pendingStudents,
        'enrolledStudents' => $enrolledStudents,
    ]);
})->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin,student']);

//Admin Routes
Route::prefix('admission')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin'])
    ->group(function () {

        // Route for selected applicant (pending student) to view their details
        Route::get('/pending/{student}', function (\App\Models\Student $student) {
            // Eager load user relationship and admission files
            $student->load(['user', 'admissionFiles']);

            return Inertia::render('Admission/PendingPage/EnrollmentRequest', [
                'student' => $student,
            ]);
        })->name('pending.student.view');

        // Route for selected enrolled student to view their information
        Route::get('/enrolled/{studentid}', function ($studentid) {
            return Inertia::render('Admission/EnrolledPage/StudentInfo', [
                'studentid' => $studentid,
            ]);
        })->name('enrolled.student.view');

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
        

