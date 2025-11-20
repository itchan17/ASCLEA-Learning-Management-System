<?php

use App\Http\Controllers\Programs\GradeController;
use App\Models\Programs\Grade;
use Illuminate\Support\Facades\Route;

// Route for Student Grades
Route::get('/grades', [GradeController::class, 'getStudentGrades'])->middleware(['auth', 'verified', 'preventBack'])->can('accessGrades', Grade::class)->name('grades');
