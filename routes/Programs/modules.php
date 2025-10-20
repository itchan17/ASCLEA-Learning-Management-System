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

        // Update material
        Route::put('/material/{material}', [MaterialController::class, 'updateMaterial'])->name('material.update');

        // Unpublish material
        Route::put('/materials/{material}/unpublish', [MaterialController::class, 'unpublishMaterial'])->name('material.unpublish');
    });
