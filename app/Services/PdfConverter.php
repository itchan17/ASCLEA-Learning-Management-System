<?php

namespace App\Services;

class PdfConverter
{
    public static function convertToPdf(string $inputFile, string $outputFile)
    {
        // Path to the LibreOffice binary
        $libreOffice = env('LIBREOFFICE_PATH', 'soffice');

        // Use a LibreOffice user profile in production to avoid permission issues
        $userInstallation = '';
        if (app()->environment('production')) {
            $userInstallation = '-env:UserInstallation=file:///tmp/libreoffice_profile';
        }

        // Command that sets the file to convert into pdf
        // includes input file which it the full path of file to be converted,
        // the outputFile wich the full path where the converted file will be stored    
        $command = "\"{$libreOffice}\" --headless --nologo --nofirststartwizard --norestore "
            . ($userInstallation ? $userInstallation . ' ' : '')
            . '--convert-to pdf --outdir '
            . escapeshellarg(dirname($outputFile)) . ' '
            . escapeshellarg($inputFile);

        // Run the command
        exec($command, $output, $returnCode);

        // Throw exception if conversion failed
        if ($returnCode !== 0) {
            $errorOutput = implode("\n", $output);
            throw new \Exception("Conversion failed for file: {$inputFile}. Output: {$errorOutput}");
        }
    }
}
