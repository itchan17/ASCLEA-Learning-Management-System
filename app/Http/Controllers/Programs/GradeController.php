<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\AssignedCourse;
use App\Models\Course;
use App\Models\Program;
use App\Services\Programs\GradeService;
use Illuminate\Http\Request;

class GradeController extends Controller
{
    protected GradeService $gradeService;

    public function __construct(GradeService $gradeService)
    {
        $this->gradeService = $gradeService;
    }

    public function gradeStudent(Request $request, Program $program, Course $course, AssignedCourse $assignedCourse)
    {

        $validatedData = $request->validate([
            'grade' => 'required|numeric|min:0|max:999.99',
        ]);

        $this->gradeService->createUpdateStudentGrade($validatedData['grade'], $course, $assignedCourse, $request->user()->user_id);
    }

    public function returnStudentGrade(Request $request, Program $program, Course $course)
    {
        $validated = $request->validate([
            'selectAll' => 'required|boolean',
            'selectedStudentGrades' => 'array',
            'unselectedStudentGrades' => 'array',
        ]);

        $this->gradeService->returnGrades($validated, $course->course_id);
    }
}
