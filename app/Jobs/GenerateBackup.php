<?php

namespace App\Jobs;

use App\Models\User;
use App\Services\BackupAndRestore\BackupService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateBackup implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected User $user;
    /**
     * Create a new job instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $backupService = app(BackupService::class);

        // Run Spatie backup
        $exitCode = Artisan::call('backup:run');
        $output = Artisan::output();

        if ($exitCode === 0) {
            $backupInfo = $backupService->getBackupFileInfo();

            $backupService->saveBackupFileInfo($backupInfo);

            // Send notification after finishing the job
        }
    }
}
