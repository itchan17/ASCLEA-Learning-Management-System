<?php

use App\Http\Controllers\Programs\GradeController;
use App\Models\Programs\Grade;
use Illuminate\Support\Facades\Route;

Route::prefix('programs/{program}/courses/{course}')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route for grading the student
        Route::post('/students/{assignedCourse}/grades', [GradeController::class, 'gradeStudent'])->can('assignGrade', [Grade::class, 'course'])->name('student.grade');

        // Route for returning the student grades
        Route::put('/students/grades', [GradeController::class, 'returnStudentGrade'])->can('returnGrades', [Grade::class, 'course'])->name('return.student.grades');

        // Route for downloading student grades pdf
        Route::get('/students/grades/pdf', [GradeController::class, 'exportStudentGradesToPdf'])->can('downloadGrades', [Grade::class, 'course'])->name('export.student.grades.pdf');

        // Route for downloading student grades csv
        Route::get('/students/grades/csv', [GradeController::class, 'exportActivityResponsesToCsv'])->can('downloadGrades', [Grade::class, 'course'])->name('export.student.grades.csv');
    });
