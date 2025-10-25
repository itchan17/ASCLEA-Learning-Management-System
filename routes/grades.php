<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route for Student Grades
Route::get('/grades', function () {
    return Inertia::render('Student_Grades/StudentGrades');
})->middleware(['auth', 'verified', 'preventBack', 'checkRole:student']);