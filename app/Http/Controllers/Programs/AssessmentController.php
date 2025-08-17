<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\SaveAssessmentRequest;
use App\Services\Programs\AssessmentService;
use Inertia\Inertia;


class AssessmentController extends Controller
{
    protected AssessmentService $assessmentService;

    public function __construct(AssessmentService $service)
    {
        $this->assessmentService = $service;
    }

    public function createAssessment(SaveAssessmentRequest $req, $program, $course)
    {

        $validatedAssessment = $req->validated();

        $assesssment = $this->assessmentService->saveAssessment($validatedAssessment, $course);

        // Call 2 different methods for handling each assessment type
        if ($assesssment->assessmentType->assessment_type == "activity") {
            if ($req->hasFile("assessment_files")) {
                $this->assessmentService->saveAssessmentFiles($req->assessment_files, $assesssment);
            }
        } else {
            $this->assessmentService->createInitialQuizForm($assesssment);
        }

        return back()->with('success', "Assessment created successfully.");
    }

    public function showAssessment()
    {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/ViewAssessment');
    }

    public function showEditQuizForm()
    {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/QuizForm');
    }
}
