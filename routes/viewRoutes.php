<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// This is a temporary route file created only displaying the pages, it will be deleted/changed once backend developement started

// View Landing page
Route::get('/', function () {
    return Inertia::render('LandingPage/LandingPage', ['text' => "Students"]);
});

// View dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Dashboard');
})->name('dashboard.index');

// -----Start-----
// Program routes 

Route::prefix('programs')->group(function () {

    // Programs index page
    Route::get('/', function () {
        return Inertia::render('Programs/Programs');
    })->name('programs.index');

    // Route for selected program
    Route::get('/{programId}', function ($programId) {
        return Inertia::render('Programs/ProgramComponent/ProgramContent', [
            'programId' => $programId,
        ]);
    })->name('program.view');

    // Route for selected course in the program
    Route::get('/{programId}/course/{courseId}', function ($programId, $courseId) {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContent', [
            'programId' => $programId,
            'courseId' => $courseId,
        ]);
    })->name('program.course.view');

    // Route for selected user in the program
    Route::get('/{programId}/user/{userId}', function ($programId, $userId) {
        return Inertia::render('Programs/ProgramComponent/PeopleComponent/ViewUser', [
            'programId' => $programId,
            'userId' => $userId,
        ]);
    })->name('program.user.view');

    // Route for viewing material
    Route::get('/{programId}/course/{courseId}/material/{materialId}', function ($programId, $courseId, $materialId) {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/MaterialsComponents/ViewMaterial', [
            'programId' => $programId,
            'courseId' => $courseId,
            'materialId' => $materialId,
        ]);
    })->name('program.course.material.view');

    // Route for viewing file
    Route::get('/{programId}/course/{courseId}/material/{materialId}/file/{fileId}', function ($programId, $courseId, $materialId, $fileId) {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/MaterialsComponents/ViewFile', [
            'programId' => $programId,
            'courseId' => $courseId,
            'materialId' => $materialId,
            'fileId' => $fileId,
        ]);
    })->name('program.course.material.file.view');

     // Route for editing quiz form
    Route::get('/{programId}/course/{courseId}/material/{materialId}/form/{formId}/edit', function ($programId, $courseId, $materialId, $formId) {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/QuizForm', [
            'programId' => $programId,
            'courseId' => $courseId,
            'materialId' => $materialId,
            'formId' => $formId,
        ]);
    })->name('program.course.material.form.edit');

});




// -----End-----

// Registration route
Route::get('/registration', function () {
    return Inertia::render('RegistrationPage/RegistrationPage');
});

// Admission routes

Route::get('/admission', function () {
    return Inertia::render('Admission/AdmissionPage');
});

// Route for selected applicant to view their admission details
Route::get('/admission/pending/{applicantId}', function ($applicantId) {
    return Inertia::render('Admission/PendingPage/EnrollmentRequest', [
        'applicantId' => $applicantId,
    ]);
})->name('pending.applicant.view');

// Route for selected enrolled student to view their information
Route::get('/admission/enrolled/{studentid}', function ($studentid) {
    return Inertia::render('Admission/EnrolledPage/StudentInfo', [
        'studentid' => $studentid,
    ]);
})->name('enrolled.student.view');

// --End--

Route::get('/login', function () {
    return Inertia::render('LoginPage/Login');
});

// routes/web.php
Route::get('/emailverification', function () {
    return Inertia::render('LoginPage/Emailverification');
});

// routes/web.php
Route::get('/changepassword', function () {
    return Inertia::render('LoginPage/Changepassword');
});
