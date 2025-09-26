<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;

// View Landing page
Route::get('/', function () {
    return Inertia::render('LandingPage/LandingPage');
})->middleware('guest', 'preventBack');

// Contact form submission
Route::post('/contact', [ContactController::class, 'store'])->name('contact.submit');

// Admin routes
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Contact management
    Route::resource('contacts', \App\Http\Controllers\Admin\ContactController::class)->except(['create', 'edit']);
    
    // Update contact status
    Route::patch('contacts/{contact}/status', [\App\Http\Controllers\Admin\ContactController::class, 'updateStatus'])
        ->name('contacts.status');
});
