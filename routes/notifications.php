<?php

use App\Http\Controllers\Notification\NotificationController;
use Illuminate\Support\Facades\Route;

Route::prefix('notifications')
    ->middleware(['auth', 'verified'])
    ->group(function () {

        Route::get('/', [NotificationController::class, 'getNotifications'])->name('get.notifications');
    });
