<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Program;
use App\Models\Programs\Section;
use App\Services\Programs\SectionService;
use Illuminate\Http\Request;

class SectionController extends Controller
{

    protected SectionService $sectionService;

    public function __construct(SectionService $sectionService)
    {
        $this->sectionService = $sectionService;
    }

    public function addSection(Request $request, Program $program, Course $course)
    {
        $validatedSectionDetails = $request->validate([
            'section_title' => 'required|string|max:255',
            'status' => 'required|in:published,draft',
        ]);

        $validatedSectionDetails['course_id'] = $course->course_id;
        $validatedSectionDetails['created_by'] = $request->user()->user_id;

        $section = Section::create($validatedSectionDetails);

        return response()->json(['success' => "Section added successfully.", 'data' => $this->sectionService->getSectionCompleteDetails($section)]);
    }
}
