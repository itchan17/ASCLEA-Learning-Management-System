<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Program;
use App\Models\Programs\Assessment;
use App\Services\Programs\AssessmentResponseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentResponseController extends Controller
{
    protected AssessmentResponseService $assessmentResponseService;

    public function __construct(AssessmentResponseService $service)
    {
        $this->assessmentResponseService = $service;
    }


    public function showAssessmentResponse(Program $program, Course $course, Assessment $assessment)
    {
        return Inertia::render(
            'Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/Response/ViewResponses',
            [
                'programId' => $program->program_id,
                'courseId' => $course->course_id,
                'assessment' => fn() => $assessment->load('assessmentType')->load('quiz')->loadCount(['assessmentSubmissions' => function ($query) {
                    $query->whereNotNull('submitted_at');
                }]),
                'summary' => fn() => $this->assessmentResponseService->getAssessmentResponsesSummary($assessment),
                'frequentlyMissedQuestions' => fn() =>  $this->assessmentResponseService->getFrequentlyMissedQuestion($assessment),
                'responses' => fn() =>  $this->assessmentResponseService->getAssessmentResponses($assessment)
            ]
        );
    }
}
