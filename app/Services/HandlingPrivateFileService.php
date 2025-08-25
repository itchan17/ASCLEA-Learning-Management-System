<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class HandlingPrivateFileService
{
    // Handles retrieving private files
    // Take the filePath parameter which is use to retrieve all the files 
    // even it's converter to pdf
    public static function retrieveFile(string $filePath)
    {
        if (!Storage::disk('local')->exists($filePath)) {
            abort(404);
        }

        $path = storage_path("app/private/{$filePath}");

        return response()->file($path);
    }

    // Manage downloading private files
    // takes two parameter the original file path which is needed sinze the system
    // convert non pdf fiels to pdf
    // The fileName is use give the downloaded file its orginal file name
    public static function downloadFile(string $originalFilePath, string $fileName)
    {
        if (!Storage::disk('local')->exists($originalFilePath)) {
            abort(404);
        }

        return Storage::download($originalFilePath, $fileName, ['Content-Type' => 'application/octet-stream',]);
    }
}
