<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;

// View Landing page
Route::get('/', function () {
    return Inertia::render('LandingPage/LandingPage');
})->middleware('guest', 'preventBack');

// Contact form submission
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
