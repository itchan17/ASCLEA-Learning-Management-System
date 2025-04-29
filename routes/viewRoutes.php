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