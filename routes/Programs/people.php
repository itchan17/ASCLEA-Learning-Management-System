<?php

use App\Http\Controllers\Programs\PeopleController;
use App\Models\AssignedCourse;
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
        Route::delete(('/member/{member}/remove'), [PeopleController::class, 'removeMember'])->can('removeMember', LearningMember::class)->name('program.remove.member');

        // Route for viewing specific member
        Route::get('/member/{member}', [PeopleController::class, 'viewMember'])->can('view', LearningMember::class)->name('program.member.view');

        // Route for listing courses to be assigned to member
        Route::get('/member/{member}/courses', [PeopleController::class, 'listCourses'])->can('viewAny', AssignedCourse::class)->name('program.member.assign.courses.list');

        // Route for assigning course to member
        Route::post('/member/{member}/courses', [PeopleController::class, 'assignCourses'])->can('assignCourse', AssignedCourse::class)->name('program.member.assign.courses.store');

        // Route for assigning course to member
        Route::delete('/member/{member}/courses/{assignedCourse}', [PeopleController::class, 'removeAssignedCourse'])->can('removeAssignedCourse', AssignedCourse::class)->name('program.member.assign.courses.remove');

});