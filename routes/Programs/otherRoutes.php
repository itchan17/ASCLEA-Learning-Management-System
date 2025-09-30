<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('programs')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin,faculty,student'])
    ->group(function () {
        // Route for viewing material
        Route::get('/{programId}/course/{courseId}/material/{materialId}', function ($programId, $courseId, $materialId) {
            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/MaterialsComponents/ViewMaterial', [
                'programId' => $programId,
                'courseId' => $courseId,
                'materialId' => $materialId,
            ]);
        })->name('program.course.material.view');
    });
