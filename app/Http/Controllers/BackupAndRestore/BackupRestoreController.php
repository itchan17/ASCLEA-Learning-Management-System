<?php

namespace App\Http\Controllers\BackupAndRestore;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Jobs\GenerateBackup;
use App\Models\Backups\Backup;
use App\Services\BackupAndRestore\BackupService;
use App\Services\BackupAndRestore\RestoreService;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;

class BackupRestoreController extends Controller
{
    protected BackupService $backupService;
    protected RestoreService $restoreService;

    public function __construct(BackupService $backupService, RestoreService $restoreService)
    {
        $this->backupService  = $backupService;
        $this->restoreService  = $restoreService;
    }

    public function backup(Request $request)
    {
        // Run a job that will create bakup in the background
        GenerateBackup::dispatch($request->user());

        return response()->json('Backup is currently in progress.');
    }

    public function restore(Request $request, Backup $backup)
    {
        $extractPath = $this->restoreService->extractFile($backup->file_path);

        $this->restoreService->restoreDatabase($extractPath);

        $this->restoreService->restoreFiles($extractPath);

        $this->restoreService->cleanupExtractedFiles($extractPath);

        // Force logout user
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
