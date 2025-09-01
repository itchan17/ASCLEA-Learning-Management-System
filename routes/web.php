<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

// Add CSRF protection for the contact form submission
Route::post('/contact', [ContactController::class, 'store'])
    ->name('contact.submit')
    ->middleware(['web']);


