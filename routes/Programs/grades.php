<?php

use App\Http\Controllers\Programs\GradeController;
use Illuminate\Support\Facades\Route;

Route::prefix('programs/{program}/courses/{course}')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route for grading the student
        Route::post('/students/{assignedCourse}/grades', [GradeController::class, 'gradeStudent'])->name('student.grade');

        // Route for returning the student grades
        Route::put('/students/grades', [GradeController::class, 'returnStudentGrade'])->name('return.student.grades');
    });
