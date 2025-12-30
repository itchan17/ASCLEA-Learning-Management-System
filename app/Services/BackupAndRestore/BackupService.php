<?php

namespace App\Services\BackupAndRestore;

use App\Models\Backups\Backup;
use Illuminate\Support\Facades\Storage;

class BackupService
{
    public function getBackupFileInfo()
    {
        $backupDisk = Storage::disk('backups'); // Make sure 'backups' disk is configured
        $files = $backupDisk->files('Asclea'); // get all files in the backup folde

        // Filter only ZIP files
        $zipFiles = array_filter($files, fn($file) => str_ends_with($file, '.zip'));

        // Get the latest backup
        $latestBackup = collect($zipFiles)->sortByDesc(fn($file) => $backupDisk->lastModified($file))->first();

        if ($latestBackup) {
            $backupInfo = [
                'name' => basename($latestBackup),
                'path' => $latestBackup,
                'size' => $backupDisk->size($latestBackup),
                'lastModified' => date('Y-m-d H:i:s', $backupDisk->lastModified($latestBackup)),
            ];

            return $backupInfo;
        }

        return [];
    }

    public function saveBackupFileInfo(array $backupInfo)
    {
        if (!empty($backupInfo)) {
            $newBackupData = Backup::create([
                'file_name' => $backupInfo['name'],
                'file_path' => $backupInfo['path'],
                'file_size' => $backupInfo['size'],
            ]);

            return $newBackupData;
        }
    }
}
