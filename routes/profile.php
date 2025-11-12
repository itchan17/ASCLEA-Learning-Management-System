<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route for viewing profile page
Route::get('/profile', function () {
    return Inertia::render('Profile/Profile');
})->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin,faculty,student,skipvalidation'])->name('profile');

