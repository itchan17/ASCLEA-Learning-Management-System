<?php

use App\Http\Controllers\Programs\GradeController;
use Illuminate\Support\Facades\Route;

// Route for Student Grades
Route::get('/grades', [GradeController::class, 'getStudentGrades'])->middleware(['auth', 'verified', 'preventBack'])->name('grades');
