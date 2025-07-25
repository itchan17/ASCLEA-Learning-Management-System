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
        Route::post('/',  [ProgramController::class, 'store'])->name('program.create');
});



       