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

        // Archive material
        Route::delete('/materials/{material}/archive', [MaterialController::class, 'archiveMaterial'])->name('material.archive');

        // Restore material
        Route::put('/material/{material}/restore', [MaterialController::class, 'restoreMaterial'])->name('material.restore');

        // View material
        Route::get('/material/{material}', [MaterialController::class, 'viewMaterial'])->name('material.view');

        // Stream material file
        Route::get('/material/{material}/material-files/{file}/stream', [MaterialController::class, 'streamMaterialFile'])->name('material.file.stream');

        // Download material file
        Route::get('/material/{material}/material-files/{file}/download', [MaterialController::class, 'downloadMaterialFile'])->name('material.file.download');
    });
