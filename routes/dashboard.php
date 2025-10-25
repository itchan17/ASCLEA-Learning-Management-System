<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// View dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Dashboard');
})->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin,faculty,student'])->name('dashboard.index');
