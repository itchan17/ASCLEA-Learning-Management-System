<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Program;
use App\Models\Programs\Section;
use App\Models\Programs\SectionItem;
use App\Models\Programs\StudentProgress;
use App\Services\Programs\SectionService;
use App\Services\Programs\StudentProgressService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StudentProgressController extends Controller
{

    protected SectionService $sectionService;
    protected StudentProgressService $studentProgressService;

    public function __construct(SectionService $sectionService, StudentProgressService $studentProgressService)
    {

        $this->sectionService = $sectionService;
        $this->studentProgressService = $studentProgressService;
    }

    public function handleStudentProgress(Request $request, Program $program, Course $course, Section $section, SectionItem $sectionItem)
    {
        $assignedCourseId = $this->sectionService->getAssignedCourseId($request->user(), $course->course_id);

        $this->studentProgressService->doneUndoneStudentProgress($assignedCourseId, $sectionItem);
    }
}
