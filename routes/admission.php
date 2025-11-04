<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\Admission\AdmissionFile;
use App\Http\Controllers\Admission\AdmissionFileController;

Route::get('/admission', function () {
    //Route for fetching Pending Students
    $user = auth()->user();
    $student = Student::where('user_id', $user->user_id)->first();
    $pendingStudents = Student::with('user')
        ->where('enrollment_status', 'pending')
        ->get(['student_id', 'user_id', 'enrollment_status', 'created_at']);

    //Route for fetching Enrolled, Dropout, and Withdrawn Students
    $enrolledStudents = Student::with('user')
        ->whereIn('enrollment_status', ['enrolled', 'dropout', 'withdrawn'])
        ->get(['student_id', 'user_id', 'enrollment_status', 'created_at']);

    //Route for Render the Pending and Enrolled Students
    return Inertia::render('Admission/AdmissionPage', [
        'pendingStudents' => $pendingStudents,
        'enrolledStudents' => $enrolledStudents,
        'student' => $student,
    ]);
})->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin,student']);

//Admin Routes
Route::prefix('admission')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin'])
    ->group(function () {

        // Route for selected applicant (pending student) for admin to view their details
        Route::get('/pending/{student}', function (\App\Models\Student $student) {
            // Eager load user relationship and admission files
            $student->load(['user', 'admissionFiles']);

            return Inertia::render('Admission/PendingPage/EnrollmentRequest', [
                'student' => $student,
            ]);
        })->name('pending.student.view');


        // Route for selected enrolled student for admin view to their details
        Route::get('/enrolled/{student}', function (Student $student) {
            $student->load(['user', 'admissionFiles']);

            return Inertia::render('Admission/EnrolledPage/StudentInfo', [
                'student' => $student,
            ]);
        })->name('enrolled.student.view');

        // Route for Updating Student Information
        Route::put('/enrolled/{student}', [AdmissionFileController::class, 'updateStudent'])
            ->name('admission.updateStudent');
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
        

