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

});




// -----End-----

// Registration route
Route::get('/registration', function () {
    return Inertia::render('RegistrationPage/Registration');
});



