<?php

use App\Http\Controllers\Programs\ProgramController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('programs')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        // Programs index page
        Route::get('/', [ProgramController::class, 'show'])->middleware(['checkRole:admin,faculty,student'])->name('programs.index');
    
        // Create program
        Route::post('/create',  [ProgramController::class, 'store'])->name('program.create');

        // Update program
        Route::put('/{program}/update',  [ProgramController::class, 'update'])->name('program.update');

        // Archive program
        Route::delete('/{program}/delete',  [ProgramController::class, 'archive'])->name('program.archive');

        // Show the selected program
        Route::get('/{program}', [ProgramController::class, 'showProgram'])->middleware(['checkRole:admin,faculty,student'])->name('program.show');

        // Validate added course in add program form
        Route::post('/validate-course', [ProgramController::class, 'validateAddedCourse'])->name('validate.course');
});



       