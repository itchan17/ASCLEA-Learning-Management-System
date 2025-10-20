<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\AddMaterialRequest;
use App\Models\Course;
use App\Models\Program;
use App\Models\Programs\Material;
use App\Services\Programs\MaterialService;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    protected MaterialService $materialService;

    public function __construct(MaterialService $materialService)
    {
        $this->materialService = $materialService;
    }

    public function addMaterial(AddMaterialRequest $request, Program $program, Course $course)
    {
        $validatedData = $request->validated();
        $validatedData['course_id'] = $course->course_id;
        $validatedData['created_by'] = $request->user()->user_id;

        // Save the materials data in the table
        $material = Material::create($validatedData);

        // Save the files in file storage and table if it has value
        if ($request->hasFile("material_files")) {
            $this->materialService->saveMaterialFiles($request->material_files, $material);
        }

        $materialCompleteDetails = $this->materialService->getmaterialCompleteDetails($material);

        return response()->json(['success' => "Material added successfully.", 'data' => $materialCompleteDetails]);
    }

    public function getMaterials(Request $request, Program $program, Course $course)
    {
        $materialList = $this->materialService->getMaterialList($request->user()->user_id, $course->course_id);

        return response()->json($materialList);
    }

    public function updateMaterial(AddMaterialRequest $request, Program $program, Course $course, Material $material)
    {
        $validatedMaterialData = $request->validated();

        $upatedMaterial = $this->materialService->updateMaterial($material, $validatedMaterialData);

        if (!empty($request->removed_files)) {
            $this->materialService->removeMaterialFiles($request->removed_files);
        }

        if ($request->has("material_files")) {
            $this->materialService->saveMaterialFiles($validatedMaterialData['material_files'], $upatedMaterial);
        }

        $materialCompleteDetails = $this->materialService->getmaterialCompleteDetails($upatedMaterial);

        return response()->json(['success' => "Material updated sucessfully.", 'data' => $materialCompleteDetails]);
    }

    public function unpublishMaterial(Program $program, Course $course, Material $material)
    {
        // Updates the material status by using true as argument in the service
        $unpublishedmaterial = $this->materialService->updateMaterial($material, [], true);

        $materialCompleteDetails = $this->materialService->getmaterialCompleteDetails($unpublishedmaterial);

        return response()->json(['success' => "Assessment unpublished sucessfully.", 'data' => $materialCompleteDetails]);
    }
}
