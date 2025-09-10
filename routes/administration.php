<?php

use App\Http\Controllers\Administration\StaffController;
use Illuminate\Support\Facades\Route;
use App\Models\Administration;

Route::prefix('administration')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin'])
    ->group(function () {
        
        // Administration dashboard
        Route::get('/', [StaffController::class, 'administrationIndex'])->name('administration.index');

        // Show staff details + courses
        Route::get('staff/create', [StaffController::class, 'create'])->name('staff.create');

        // Show create form
        Route::post('staff', [StaffController::class, 'store'])->name('staff.store');

        // Store new staff
        Route::get('staff/{id}', [StaffController::class, 'show'])->name('staff.show');

        // Show edit form
        Route::get('staff/{id}/edit', [StaffController::class, 'edit'])->name('staff.edit');

        // Update staff
        Route::put('staff/{id}', [StaffController::class, 'update'])->name('staff.update');

        // Soft delete (archive)
        Route::delete('staff/{id}', [StaffController::class, 'destroy'])->name('staff.destroy');

        //separate route for assigned courses
        Route::get('staff/{id}/courses', [StaffController::class, 'showAssignedCourses'])->name('staff.courses');

        // View staff details (like your old closure)
        Route::get('/{staffId}', [StaffController::class, 'administrationView'])->name('administration.view');
});