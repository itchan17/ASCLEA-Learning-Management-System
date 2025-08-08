<?php

use App\Http\Controllers\Programs\PeopleController;
use App\Models\LearningMember;
use Illuminate\Support\Facades\Route;

Route::prefix('programs/{program}')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Route for showing selected course in the program
        Route::get('/users',  [PeopleController::class, 'listUsers'])->can('accessUsersToAdd', LearningMember::class)->name('program.list.users');

        // Route for adding members in the program
        Route::post('/member/add',  [PeopleController::class, 'addMember'])->can('addMember', LearningMember::class)->name('program.add.member');

        // Route for removing member in the table
        Route::delete(('/member/{member}/remove'), [PeopleController::class, 'removeMember'])->name('program.remove.member');
});