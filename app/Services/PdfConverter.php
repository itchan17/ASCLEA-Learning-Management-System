<?php

namespace App\Services;

class PdfConverter
{
    public static function convertToPdf(string $inputFile, string $outputFile)
    {
        // Path for the libreoffice application that is respoonsible for file conversion
        $libreOffice = env('LIBREOFFICE_PATH', 'soffice');

        // Command that sets the file to convert into pdf
        // includes input file which it the full path of file to be converted,
        // the outputFile wich the full path where the converted file will be stored
        $command = "\"{$libreOffice}\" --headless --nologo --nofirststartwizard --norestore --convert-to pdf --outdir "
            . escapeshellarg(dirname($outputFile)) . " "
            . escapeshellarg($inputFile);


        // Runs command in shell that will convert file to pdf
        exec($command, $output, $returnCode);

        // Throws an exception error if file covnersion failed
        if ($returnCode !== 0) {
            throw new \Exception("Conversion failed for file: " . $inputFile);
        }
    }
}
