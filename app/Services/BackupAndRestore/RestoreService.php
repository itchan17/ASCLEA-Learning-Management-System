<?php

namespace App\Services\BackupAndRestore;

use App\Models\Backups\Backup;
use Illuminate\Support\Facades\Storage;
use ZipArchive;
use Illuminate\Support\Facades\File;

class RestoreService
{
    public function extractFile($zipFilePath)
    {
        $zip = new ZipArchive;

        if ($zip->open(storage_path('app/backups/' . $zipFilePath)) === TRUE) {

            // Extract to temp folder
            $extractPath = storage_path('app/backups/temp_restore');
            $zip->extractTo($extractPath);
            $zip->close();

            return $extractPath;
        } else {
            throw new \Exception('Could not open backup zip file.');
        }
    }

    public function restoreDatabase(string $extractPath)
    {
        $sqlFile = $extractPath . '/db-dumps/mysql-asclea_lms.sql';

        $database = env('DB_DATABASE');
        $username = env('DB_USERNAME');
        $password = env('DB_PASSWORD');
        $host = env('DB_HOST');

        $command = sprintf(
            'mysql -h%s -u%s -p%s %s < %s',
            escapeshellarg($host),
            escapeshellarg($username),
            escapeshellarg($password),
            escapeshellarg($database),
            escapeshellarg($sqlFile)
        );

        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            throw new \Exception('Database restore failed: ' . implode("\n", $output));
        }
    }

    public function restoreFiles(string $extractPath): array
    {
        $restored = [];

        // Restore public files
        $publicSource = $extractPath . '/storage/app/public';

        // Check if the public folder  exist
        if (File::exists($publicSource)) {
            $destination = storage_path('app/public');

            // Check if destination exist
            // We delete it, make new directory then copy the files from the backup

            if (File::exists($destination)) {
                File::deleteDirectory($destination);
            }
            File::makeDirectory($destination, 0755, true);

            File::copyDirectory($publicSource, $destination);
            $restored['public'] = count(File::allFiles($destination));
        }

        // Restore private files
        $privateSource = $extractPath . '/storage/app/private';
        if (File::exists($privateSource)) {
            $destination = storage_path('app/private');

            if (File::exists($destination)) {
                File::deleteDirectory($destination);
            }
            File::makeDirectory($destination, 0755, true);

            File::copyDirectory($privateSource, $destination);
            $restored['private'] = count(File::allFiles($destination));
        }

        return $restored;
    }

    public function cleanupExtractedFiles($extractPath)
    {
        if (!$extractPath || !File::exists($extractPath)) {
            return;
        }

        try {
            File::deleteDirectory($extractPath);
        } catch (\Exception $e) {
        }
    }
}
