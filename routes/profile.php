<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\ProfileController;

// Route for viewing profile page
Route::middleware(['auth', 'verified', 'preventBack', 'checkRole:admin,faculty,student'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/photo', [ProfileController::class, 'updateProfile'])->name('profile.photo.update');

});

