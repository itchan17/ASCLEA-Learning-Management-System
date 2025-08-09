<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegistrationController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\Auth\LoginController;
use Inertia\Inertia;

// Login Routes
Route::middleware('guest')->group(function() {
    Route::get('/login', [LoginController::class, 'show'])->middleware('preventBack')->name('login');
    Route::post('/login', [LoginController::class, 'loginUser'])->name('login.user');

    // Registration routes 
    // Render registration page
    Route::get('/register', [RegistrationController::class, 'show'])->middleware('preventBack')->name('register');
    // Register user
    Route::post('/register', [RegistrationController::class, 'registerUser'])->name('register.user');

    Route::get('forget-password', [ForgotPasswordController::class, 'showForgetPasswordForm'])->name('forget.password.get');
    Route::post('forget-password', [ForgotPasswordController::class, 'submitForgetPasswordForm'])->name('forget.password.post'); 
    Route::get('reset-password/{token}', [ForgotPasswordController::class, 'showResetPasswordForm'])->name('reset.password.get');
    Route::post('reset-password', [ForgotPasswordController::class, 'submitResetPasswordForm'])->name('reset.password.post');
});


// For email verification
Route::middleware('auth')->group(function() {
    Route::get('/email/verify', [VerificationController::class, 'verifyEmail'])->middleware('preventBack')->name('verification.notice');
    Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verifyEmailNotice'])->middleware('signed')->name('verification.verify'); 
    Route::post('/email/verification-notification', [VerificationController::class, 'verifyEmailHandler'])->middleware('throttle:6,1')->name('verification.send');
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout.user');
});







  