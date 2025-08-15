<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// View Landing page
Route::get('/', function () {
    return Inertia::render('LandingPage/LandingPage');
})->middleware('guest', 'preventBack');

// For handling undefined routes
Route::fallback(function () {
    return Inertia::render('Errors/NotFound')
        ->toResponse(request())
        ->setStatusCode(404);
});


Route::get('/MockQuiz', function () {
    return Inertia::render('CheatingMitigation/MockQuiz');
})->middleware('guest', 'preventBack');