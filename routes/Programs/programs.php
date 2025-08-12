<?php

use App\Http\Controllers\Programs\ProgramController;
use App\Models\Program;
use Illuminate\Support\Facades\Route;

Route::prefix('programs')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {
        // Programs index page
        Route::get('/', [ProgramController::class, 'index'])->can('viewAny', Program::class)->name('programs.index');
       
        // Create program
        Route::post('/create',  [ProgramController::class, 'store'])->can('create', Program::class)->name('program.create');

        // Update program
        Route::put('/{program}/update',  [ProgramController::class, 'update'])->can('update', Program::class)->name('program.update');

        // Archive program
        Route::delete('/{program}/delete',  [ProgramController::class, 'archive'])->can('delete', Program::class)->name('program.archive');

        // Show the selected program
        Route::get('/{program}', [ProgramController::class, 'showProgram'])->can('view', Program::class)->middleware(['checkRole:admin,faculty,student'])->name('program.show');

        // Validate added course in add program form
        Route::post('/validate-course', [ProgramController::class, 'validateAddedCourse'])->name('validate.course');

        Route::put('/{program}/background/update', [ProgramController::class, 'updateBackground'])->can('update', Program::class)->name('program.background.update');
});



       