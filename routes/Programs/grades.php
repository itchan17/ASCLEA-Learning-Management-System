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

        // Route for downloading student grades pdf
        Route::get('/students/grades/pdf', [GradeController::class, 'exportStudentGradesToPdf'])->name('export.student.grades.pdf');

        // Route for downloading student grades csv
        Route::get('/students/grades/csv', [GradeController::class, 'exportActivityResponsesToCsv'])->name('export.student.grades.csv');
    });
