<?php

use App\Http\Controllers\Programs\MaterialController;
use App\Http\Controllers\Programs\SectionController;
use App\Http\Controllers\Programs\StudentProgressController;
use App\Models\Programs\Material;
use App\Models\Programs\Section;
use App\Models\Programs\StudentProgress;
use Illuminate\Support\Facades\Route;

Route::prefix('programs/{program}/courses/{course}')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // ----- Material Routes -----

        // Create assesmsent
        Route::post('/materials', [MaterialController::class, 'addMaterial'])->can('createMaterial', [Material::class, 'course'])->name('material.add');

        // Get  all the materials
        Route::get('/materials', [MaterialController::class, 'getMaterials'])->can('viewMaterialList', [Material::class, 'course'])->name('materials.get');

        // View material
        Route::get('/materials/{material}', [MaterialController::class, 'viewMaterial'])->can('viewMaterial', ['material', 'course'])->name('material.view');

        // Update material
        Route::put('/materials/{material}', [MaterialController::class, 'updateMaterial'])->can('updateMaterial', 'material')->name('material.update');

        // Unpublish material
        Route::put('/materials/{material}/unpublish', [MaterialController::class, 'unpublishMaterial'])->can('updateMaterial', 'material')->name('material.unpublish');

        // Archive material
        Route::delete('/materials/{material}/archive', [MaterialController::class, 'archiveMaterial'])->can('archiveMaterial', 'material')->name('material.archive');

        // Restore material
        Route::put('/materials/{material}/restore', [MaterialController::class, 'restoreMaterial'])->can('restoreMaterial', [Material::class, 'material'])->name('material.restore');

        // Stream material file
        Route::get('/materials/{material}/material-files/{file}/stream', [MaterialController::class, 'streamMaterialFile'])->can('viewMaterialFile', ['material', 'course'])->name('material.file.stream');

        // Download material file
        Route::get('/materials/{material}/material-files/{file}/download', [MaterialController::class, 'downloadMaterialFile'])->can('downloadMaterialFile', ['material', 'course'])->name('material.file.download');

        // ----- Section Routes -----

        // Create section
        Route::post('/sections', [SectionController::class, 'addSection'])->can('createSection', Section::class)->name('section.add');

        // Get sections
        Route::get('/sections', [SectionController::class, 'getSections'])->can('viewSetionList', [Section::class, 'course'])->name('sections.get');

        // Update section
        Route::put('/sections/{section}', [SectionController::class, 'updateSection'])->can('updateSection', 'section')->name('section.update');

        // Update section status
        Route::put('/sections/{section}/status/update', [SectionController::class, 'publishUnpublishSection'])->can('updateSection', 'section')->name('section.status.update');

        // Archive section
        Route::delete('/sections/{section}', [SectionController::class, 'archiveSection'])->can('archiveSection', 'section')->name('section.archive');

        // Restore section
        Route::put('/sections/{section}/restore', [SectionController::class, 'restoreSection'])->can('restoreSection', [section::class, 'section'])->name('section.restore');

        // Sort section items
        Route::put('/sections/{section}/section-items/{sectionItem}', [SectionController::class, 'sortSectionItem'])->can('updateSection', 'section')->name('section.item.sort');

        // ----- Student Porgress Routes -----

        // For marking as done and undone a section material
        Route::put('/sections/{section}/section-items/{sectionItem}/student-progress', [StudentProgressController::class, 'handleStudentProgress'])->can('doneUndoneSectionItem', [StudentProgress::class, 'course'])->name('section.item.useer.progress');
    });
