<?php

use App\Http\Controllers\BackupAndRestore\BackupRestoreController;
use Illuminate\Support\Facades\Route;

Route::prefix('backup-and-restore')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {
        Route::post('/backup', [BackupRestoreController::class, 'backup'])->name('backup');

        Route::put('/{backup}/restore', [BackupRestoreController::class, 'restore'])->name('restore');
    });
