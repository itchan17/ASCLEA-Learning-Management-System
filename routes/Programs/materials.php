<?php

use App\Http\Controllers\Programs\MaterialController;
use Illuminate\Support\Facades\Route;

Route::prefix('programs/{program}/courses/{course}')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Create assesmsent
        Route::post('/materials', [MaterialController::class, 'addMaterial'])->name('material.add');

        // Get  all the materials
        Route::get('/materials', [MaterialController::class, 'getMaterials'])->name('materials.get');
    });
