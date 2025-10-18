<?php

namespace App\Services\Programs;

use App\Models\Programs\Material;
use App\Models\Programs\MaterialFile;
use App\Services\PdfConverter;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class MaterialService
{
    public function saveMaterialFiles(array $materialFiles, Material $material)
    {
        $uploadedFiles = [];
        $now = Carbon::now(); // Get current to use for timesptamps

        foreach ($materialFiles as $index => $file) {

            // Store the files in private storage
            $originalFilePath = $file->store('materialFiles');

            $mimeType = $file->getMimeType();
            $newFilePath = null;

            // Check if the file is pptx or docx type
            if (in_array($mimeType, [
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            ])) {

                $inputFile = storage_path('app/private/' . $originalFilePath); // Get the complete file path
                $fileName = pathinfo($originalFilePath, PATHINFO_FILENAME); // Get the file name
                $outputFile = storage_path('app/private/assessmentFiles/' . $fileName); // Set the file path and file name of the converted file

                // Custom fucntion that handle pdf conversion
                PdfConverter::convertToPdf($inputFile, $outputFile);

                // Set the new file path for the converted file
                $newFilePath = "materialFiles/" . $fileName . ".pdf";
            }

            $data = [
                'material_file_id' => (string) Str::uuid(),
                'material_id' => $material->material_id,
                'file_path' => $newFilePath ?? $originalFilePath, // Check for new file path, indicates the files was converted to pdf
                'original_file_path' => $originalFilePath, // Always save the original file path
                'file_name' => $file->getClientOriginalName(),
                'file_type' => $file->getClientMimeType(),
                'created_at' => $now,
                'updated_at' => $now,
            ];

            // Add the file data inside this array
            $uploadedFiles[$index] = $data;
        }

        // Save the files data in the table
        MaterialFile::insert($uploadedFiles);
    }

    public function getMaterialList(string $userId, string  $courseId)
    {
        $materialList = Material::where('course_id', $courseId)
            ->with(['author' => function ($query) {
                $query->select('user_id', 'first_name', 'last_name');
            }])
            ->where(function ($query) use ($userId) {
                // Display material added by the user or material that was publsiehd
                $query->where('created_by', $userId)
                    ->orWhere('status', 'published');
            })
            ->with(['materialFiles' => function ($query) {
                $query->select('material_id', 'material_file_id', 'file_name', 'file_path');
            }])
            ->withTrashed()
            ->where(function ($query) use ($userId) {
                // Display not deleted materials or if deleted the user  must be t he owmner
                $query->whereNull('deleted_at')
                    ->orWhere('created_by', $userId);
            })
            ->orderBy('created_at', 'desc')
            ->orderBy('material_id', 'desc')
            ->paginate(5);

        return $materialList;
    }
}
