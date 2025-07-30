<?php

use App\Http\Controllers\Programs\CourseController;
use Illuminate\Support\Facades\Route;

Route::prefix('programs')
    ->middleware(['auth', 'verified'])
    ->group(function () {
       
        // Create a course
        Route::post('/{program}/course/create', [CourseController::class, 'store'])->name('course.create');
});



       