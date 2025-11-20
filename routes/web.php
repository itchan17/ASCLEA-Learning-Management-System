<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use Inertia\Inertia;

// View Landing page
Route::get('/', function () {
    return Inertia::render('LandingPage/LandingPage');
})->middleware('guest', 'preventBack');
  
// Contact form submission (Landing Page)
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');
