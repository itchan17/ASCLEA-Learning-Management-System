<?php

use App\Http\Controllers\Programs\PeopleController;
use Illuminate\Support\Facades\Route;

Route::prefix('programs/{program}')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route for showing selected course in the program
        Route::get('/users',  [PeopleController::class, 'listUsers'])->name('program.list.users');

        // Route for adding members in the program
        Route::post('/member/add',  [PeopleController::class, 'addMember'])->name('program.add.member');
});