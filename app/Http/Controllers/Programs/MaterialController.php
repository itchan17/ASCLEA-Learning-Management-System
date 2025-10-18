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
        $material->load([
            'author:user_id,first_name,last_name',
            'materialFiles:material_id,material_file_id,file_name,file_path',
        ]);

        return response()->json(['success' => "Material added successfully.", 'data' => $material]);
    }

    public function getMaterials(Request $request, Program $program, Course $course)
    {
        $materialList = $this->materialService->getMaterialList($request->user()->user_id, $course->course_id);

        return response()->json($materialList);
    }
}
