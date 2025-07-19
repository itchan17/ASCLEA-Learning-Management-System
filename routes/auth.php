<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegistrationController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\Auth\LoginController;


// Login Routes
Route::get('/login', [LoginController::class, 'show'])->middleware(['guest', 'preventBack'])->name('login');

Route::post('/login', [LoginController::class, 'loginUser'])->middleware('guest')->name('login.user');

// Registration routes 
// Render registration page
Route::get('/register', [RegistrationController::class, 'show'])->name('register');

// Register user
Route::post('/register', [RegistrationController::class, 'registerUser'])->name('register.user');

// For email verification
Route::middleware('auth')->group(function() {
    Route::get('/email/verify', [VerificationController::class, 'verifyEmail'])->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verifyEmailNotice'])->middleware('signed')->name('verification.verify');
    
    Route::post('/email/verification-notification', [VerificationController::class, 'verifyEmailHandler'])->middleware('throttle:6,1')->name('verification.send');
});




  