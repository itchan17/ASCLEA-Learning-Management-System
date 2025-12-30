<?php

namespace App\Http\Controllers\BackupAndRestore;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Jobs\GenerateBackup;
use App\Services\BackupAndRestore\BackupService;
use Illuminate\Support\Facades\Artisan;

class BackupRestoreController extends Controller
{
    protected BackupService $backupService;

    public function __construct(BackupService $backupService)
    {
        $this->backupService  = $backupService;
    }

    public function backup(Request $request)
    {
        // Run a job that will create bakup in the background
        GenerateBackup::dispatch($request->user());

        return response()->json('Backup is currently in progress.');
    }
}
