<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('administration')
    ->middleware(['auth', 'verified', 'preventBack', 'checkRole:admin'])
    ->group(function () {
        
        // Route for Viewing Administration Page
        Route::get('/', function () {
            return Inertia::render('Administration/Administration');
        })->name('administration.index');

        Route::get('/{userId}', function ($userId) {
            return Inertia::render('Administration/AdministrationComponents/ViewStaff', ['userId' => $userId,]);
        })->name('administration.view');

});