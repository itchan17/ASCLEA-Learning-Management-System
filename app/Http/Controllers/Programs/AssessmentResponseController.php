<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Program;
use App\Models\Programs\Assessment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentResponseController extends Controller
{
    public function showAssessmentResponse(Program $program, Course $course, Assessment $assessment)
    {
        return Inertia::render(
            'Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/Response/ViewResponses',
            [
                'programId' => $program->program_id,
                'courseId' => $course->course_id,
                'assessment' => fn() => $assessment->load('assessmentType'),
            ]
        );
    }
}
