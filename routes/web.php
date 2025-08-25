<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// View Landing page
Route::get('/', function () {
    return Inertia::render('LandingPage/LandingPage');
})->middleware('guest', 'preventBack');


Route::get('/MockQuiz', function () {
    return Inertia::render('CheatingMitigation/MockQuiz');
})->middleware('guest', 'preventBack');