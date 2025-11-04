<?php

use App\Http\Controllers\Programs\GradeController;
use Illuminate\Support\Facades\Route;

Route::prefix('programs/{program}/courses/{course}')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route for listing students  to be graded
        Route::get('/students', [GradeController::class, 'getStudents'])->name('student.list');

        // Route for grading the student
        Route::post('/students/{assignedCourseId}/grades', [GradeController::class, 'gradeStudent'])->name('student.add.grade');
    });
