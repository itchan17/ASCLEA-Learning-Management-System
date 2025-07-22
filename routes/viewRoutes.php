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
})->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin,faculty,student'])->name('dashboard.index');

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
    Route::get('/{programId}/course/{courseId}/file/{fileId}', function ($programId, $courseId, $fileId) {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/MaterialsComponents/ViewFile', [
            'programId' => $programId,
            'courseId' => $courseId,
            'fileId' => $fileId,
        ]);
    })->name('program.course.file.view');

     // Route for editing quiz form
    Route::get('/{programId}/course/{courseId}/quiz-form/{quizFormId}/edit', function ($programId, $courseId, $quizFormId) {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/QuizForm', [
            'programId' => $programId,
            'courseId' => $courseId,
            'quizFormId' => $quizFormId,
        ]);
    })->name('program.course.quiz-form.edit');

    // Route for viewing assessment
    Route::get('/{programId}/course/{courseId}/assessment/{assessmentId}', function ($programId, $courseId, $assessmentId) {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/ViewAssessment', [
            'programId' => $programId,
            'courseId' => $courseId,
            'assessmentId' => $assessmentId,
        ]);
    })->name('program.course.assessment.view');

     // Route for viewing assessment responses
    Route::get('/{programId}/course/{courseId}/assessment/{assessmentId}/responses', function ($programId, $courseId, $assessmentId) {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/ViewResponses', [
            'programId' => $programId,
            'courseId' => $courseId,
            'assessmentId' => $assessmentId,
        ]);
    })->name('program.course.assessment.responses');
});




// -----End-----

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



// Route for Student Grades
Route::get('/grades', function () {
    return Inertia::render('Student_Grades/StudentGrades');
});

// Route for Accounting
Route::get('/accounting', function () {
    return Inertia::render('Accounting/AccountingPage');
});

// Route for Viewing Payment History of Student
Route::get('/accounting/paymenthistory/{studentId}', function ($studentId) {
    return Inertia::render('Accounting/StaffAccounting/PaymentHistoryPage', [
        'studentId' => $studentId,
    ]);
})->name('accounting.student.view');

// Route for Viewing Payment Information
Route::get('/accounting/paymentinfo/{paymentId}/{studentId}', function ($paymentId, $studentId) {
    return Inertia::render('Accounting/StaffAccounting/PaymentInfo', [
        'paymentId' => $paymentId,
        'studentId' => $studentId,
    ]);
})->name('accounting.payment.view');

// Route for Payment History Student Page
Route::get('/payment-history', function () {
    return Inertia::render('Accounting/PaymentHistoryStudentPage');
});

// Route for Viewing a Specific Payment Info
Route::get('/accounting/studentpaymenthistory/{paymentId}', function ($paymentId) {
    return Inertia::render('Accounting/StudentPaymentHistory/StudentPaymentInfo', [
        'paymentId' => $paymentId,
    ]);
})->name('accounting.paymentInfo.view');

// Route for Viewing Administration Page
Route::get('/administration', function () {
    return Inertia::render('Administration/Administration');
})->name('administration.index');

Route::get('/administration/{userId}', function ($userId) {
    return Inertia::render('Administration/AdministrationComponents/ViewStaff', ['userId' => $userId,]);
})->name('administration.view');

// Route for Viewing Administration Page
Route::get('/archives', function () {
    return Inertia::render('Archives/Archives');
})->name('archives.index');

// Route for viewing profile page
Route::get('/profile', function () {
    return Inertia::render('Profile/Profile');
})->name('profile');

// For handling undefined routes
Route::fallback(function () {
    return Inertia::render('Errors/NotFound')
        ->toResponse(request())
        ->setStatusCode(404);
});

