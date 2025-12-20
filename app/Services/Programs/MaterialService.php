<?php

namespace App\Services\Programs;

use App\Models\Programs\Material;
use App\Models\Programs\MaterialFile;
use App\Services\PdfConverter;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class MaterialService
{
    protected SectionService $sectionService;
    protected SectionItemService $sectionItemService;

    public function __construct(SectionService $sectionService, SectionItemService $sectionItemService)
    {
        $this->sectionService = $sectionService;
        $this->sectionItemService = $sectionItemService;
    }

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
                $outputFile = storage_path('app/private/materialFiles/' . $fileName); // Set the file path and file name of the converted file

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
            ->whereDoesntHave('sectionItem') // Only gets materials not created in section
            ->orderBy('created_at', 'desc')
            ->orderBy('material_id', 'desc')
            ->paginate(5);

        return $materialList;
    }

    public function getmaterialCompleteDetails(Material $material)
    {
        return $material->load([
            'author:user_id,first_name,last_name',
            'materialFiles:material_id,material_file_id,file_name,file_path',
        ]);
    }

    public function updateMaterial(Material $material, array $updatedData, bool $isUnpublish = false)
    {
        // Check if the request is only for unpublishing the material
        if ($isUnpublish) {
            // Only udpates the material status
            $material->update(['status' => 'draft']);
        } else {
            $material->update($updatedData);
        }

        return $material->refresh();
    }

    public function removeMaterialFiles(array $removedFiles)
    {
        // Loop through each file and remove it
        foreach ($removedFiles as $removedFileId) {
            $file = MaterialFile::find($removedFileId);

            if (Storage::disk('local')->exists($file->file_path)) {
                // Check if file is not equal to original
                // If not it means the files was converted and it also has to deleted the original file
                if ($file->file_path !== $file->original_file_path) {
                    // Remove the two files
                    Storage::delete([$file->file_path, $file->original_file_path]);
                } else {
                    Storage::delete($file->file_path);
                }
            }

            $file->delete();
        }
    }

    public function archiveMaterial(Material $material)
    {

        $material->delete(); // Soft delete the material 
        if (!is_null($material->sectionItem)) {
            $material->sectionItem->delete();
            $this->sectionItemService->decrementSectionItems($material->sectionItem);
            return $this->sectionService->getSectionCompleteDetails($material->sectionItem->section);
        } else {
            return  $this->getmaterialCompleteDetails($material);
        }
    }

    public function restoreMaterial(string $materialId)
    {
        // Get the instace of model since model binding
        // is not working for soft deleted data
        $material = Material::withTrashed()->findOrFail($materialId);

        $material->restore();

        return  $this->getmaterialCompleteDetails($material);
    }
}
