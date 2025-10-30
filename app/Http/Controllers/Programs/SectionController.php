<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Program;
use App\Models\Programs\Section;
use App\Services\Programs\SectionItemService;
use App\Services\Programs\SectionService;
use Illuminate\Http\Request;

class SectionController extends Controller
{

    protected SectionService $sectionService;
    protected SectionItemService $sectionItemService;

    public function __construct(SectionService $sectionService, SectionItemService $sectionItemService)
    {
        $this->sectionService = $sectionService;
        $this->sectionItemService = $sectionItemService;
    }

    public function addSection(Request $request, Program $program, Course $course)
    {
        $validatedSectionDetails = $request->validate([
            'section_title' => 'required|string|max:255',
        ]);

        $validatedSectionDetails['course_id'] = $course->course_id;
        $validatedSectionDetails['created_by'] = $request->user()->user_id;

        $section = Section::create($validatedSectionDetails);

        return response()->json(['success' => "Section added successfully.", 'data' => $this->sectionService->getSectionCompleteDetails($section)]);
    }

    public function getSections(Request $request, Program $program, Course $course)
    {
        $sectionList = $this->sectionService->getSectionList($request->user()->user_id,  $course->course_id);

        return response()->json($sectionList);
    }

    public function updateSection(Request $request, Program $program, Course $course, Section $section)
    {
        $validatedSectionDetails = $request->validate([
            'section_title' => 'required|string|max:255',
        ]);

        $section->update($validatedSectionDetails);

        return response()->json(['success' => "Section updated successfully.", 'data' => $this->sectionService->getSectionCompleteDetails($section->refresh())]);
    }

    public function publishUnpublishSection(Program $program, Course $course, Section $section)
    {
        if ($section->status ===  "published") {
            $section->update(['status' => 'draft']);
        } else {
            $section->update(['status' => 'published']);
        }

        return response()->json(['success' => "Section updated successfully.", 'data' => $this->sectionService->getSectionCompleteDetails($section->refresh())]);
    }

    public function archiveSection(Program $program, Course $course, Section $section)
    {
        $section = $this->sectionService->archiveSection($section);

        return response()->json(['success' => "Section archived successfully.", 'data' => $section]);
    }

    public function restoreSection(Program $program, Course $course, $section)
    {
        $section = $this->sectionService->restoreSection($section);

        return response()->json(['success' => "Section restored successfully.", 'data' => $section]);
    }
}
