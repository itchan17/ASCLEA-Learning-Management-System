<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route for Viewing Administration Page
Route::get('/archives', function () {
    return Inertia::render('Archives/Archives');
})->middleware(['auth', 'verified', 'checkRole:admin,faculty', 'preventBack'])->name('archives.index');