<?php

use App\Http\Controllers\Administration\StaffController;
use Illuminate\Support\Facades\Route;
use App\Models\Administration;

Route::prefix('administration')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin'])
    ->group(function () {
        
        // Administration dashboard
        Route::get('/', [StaffController::class, 'administrationIndex'])->name('administration.index');

        // EXPORT routes
        Route::get('/staffs/export/pdf', [StaffController::class, 'exportPdf'])->name('staff.export.pdf');
        Route::get('/staffs/export/csv', [StaffController::class, 'exportCsv'])->name('staff.export.csv');

        // Show staff details + courses
        Route::get('staff/create', [StaffController::class, 'create'])->name('staff.create');

        // Show create form
        Route::post('staff', [StaffController::class, 'store'])->name('staff.store');

        // Store new staff
        Route::get('staff/{id}', [StaffController::class, 'show'])->name('staff.show');

        // Update Photo
        Route::put('staff/{id}/profile', [StaffController::class, 'updateProfile'])->name('staff.profile.update');

        // Show edit form
        Route::get('staff/{id}/edit', [StaffController::class, 'edit'])->name('staff.edit');

        // Update staff
        Route::put('staff/{id}', [StaffController::class, 'update'])->name('staff.update');

        // Soft delete (archive)
        Route::delete('staff/{id}', [StaffController::class, 'destroy'])->name('staff.destroy');

        // View staff details (like your old closure)
        Route::get('/{staffId}', [StaffController::class, 'administrationView'])->name('administration.view');
});