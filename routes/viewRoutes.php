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
});

// Program routes
Route::get('/programs', function () {
    return Inertia::render('Programs/Programs');
});

// Route for selected program
Route::get('/programs/{programId}', function () {
    return Inertia::render('Programs/ProgramComponent/ProgramContent');
});

// Route for selected course in the program
Route::get('/programs/{programId}/course/{courseId}', function () {
    return Inertia::render('Programs/CourseComponent/CourseContent');
});


// Registration route
Route::get('/registration', function () {
    return Inertia::render('RegistrationPage/Registration');
});



