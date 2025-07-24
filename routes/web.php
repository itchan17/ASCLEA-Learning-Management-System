<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// View Landing page
Route::get('/', function () {
    return Inertia::render('LandingPage/LandingPage');
});

// For handling undefined routes
Route::fallback(function () {
    return Inertia::render('Errors/NotFound')
        ->toResponse(request())
        ->setStatusCode(404);
});


