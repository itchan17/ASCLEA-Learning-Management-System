<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\SaveAssessmentRequest;
use App\Models\Programs\Assessment;
use App\Services\Programs\AssessmentService;
use Illuminate\Http\Request;
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

        $assessment = $this->assessmentService->saveAssessment($validatedAssessment, $course);

        // Call 2 different methods for handling each assessment type
        if ($req->hasFile("assessment_files")) {
            $this->assessmentService->saveAssessmentFiles($req->assessment_files, $assessment);
        }

        if ($req->assessment_type === "quiz") {
            $this->assessmentService->createInitialQuizForm($assessment);
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

    public function updateAssessment(SaveAssessmentRequest $req, $program, $course, Assessment $assessment)
    {

        $validatedUpdatedAssessment = $req->validated();

        $this->assessmentService->updateAssessment($assessment, $validatedUpdatedAssessment);

        if (!empty($req->removed_files)) {
            $this->assessmentService->removeAssessmentFiiles($req->removed_files);
        }

        if ($req->hasFile("assessment_files")) {
            $this->assessmentService->saveAssessmentFiles($req->assessment_files, $assessment);
        }

        if ($req->assessment_type === "quiz") {
            $this->assessmentService->createInitialQuizForm($assessment);
        }

        return back()->with('success', "Assessment updated successfully.");
    }

    // Independent controller that handle unpublishing of assessment
    public function unPublishAssessment($program, $course, Assessment $assessment)
    {
        $this->assessmentService->updateAssessment($assessment, [], true);

        return back()->with('success', "Assessment successfully unpublished.");
    }
}
