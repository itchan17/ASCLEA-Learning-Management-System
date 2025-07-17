<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegistrationController;
use Illuminate\Support\Facades\Auth;

// View registration page
Route::get('/registration', function () {
    return Inertia::render('RegistrationPage/RegistrationPage');
})->name('register');

// Register user
Route::post('/registration', [RegistrationController::class, 'registerUser'])->name('register.user');


// For email verification
Route::middleware('auth')->group(function() {
    Route::get('/email/verify', [RegistrationController::class, 'verifyEmail'])->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', [RegistrationController::class, 'verifyNotice'])->middleware('signed')->name('verification.verify');
    
    Route::post('/email/verification-notification', [RegistrationController::class, 'verifyHandler'])->middleware('throttle:6,1')->name('verification.send');
});



  