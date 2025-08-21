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

        $assessmentCompleteDetails = $this->assessmentService->getAssessmentCompleteDetails($assessment);

        return response()->json(['success' => "Assessment created successfully.", 'data' => $assessmentCompleteDetails]);
    }

    public function listAssessments($program, $course)
    {
        $assessments = $this->assessmentService->getAssessments($course);

        return response()->json($assessments);
    }

    public function updateAssessment(SaveAssessmentRequest $req, $program, $course, Assessment $assessment)
    {

        $validatedUpdatedAssessment = $req->validated();

        $updatedAssessment = $this->assessmentService->updateAssessment($assessment, $validatedUpdatedAssessment);

        if (!empty($req->removed_files)) {
            $this->assessmentService->removeAssessmentFiiles($req->removed_files);
        }

        if ($req->hasFile("assessment_files")) {
            $this->assessmentService->saveAssessmentFiles($req->assessment_files, $updatedAssessment);
        }

        if ($req->assessment_type === "quiz") {
            $this->assessmentService->createInitialQuizForm($updatedAssessment);
        }

        $updatedAssessmentData = $this->assessmentService->getAssessmentCompleteDetails($updatedAssessment);

        return response()->json(['success' => "Assessment updated sucessfully.", 'data' => $updatedAssessmentData]);
    }

    // Independent controller that handle unpublishing of assessment
    public function unPublishAssessment($program, $course, Assessment $assessment)
    {
        // Update the status of assessment
        // With true parameter indicating that the function was called for updating assessment status to draft
        $udpatedAssessment = $this->assessmentService->updateAssessment($assessment, [], true);

        // Get the updated data what will be returned in reponse
        $updatedAssessmentData = $this->assessmentService->getAssessmentCompleteDetails($udpatedAssessment);

        return response()->json(['success' => "Assessment unpublished sucessfully.", 'data' => $updatedAssessmentData]);
    }

    public function archiveAssessment($program, $course, Assessment $assessment)
    {
        $archivedAssessment = $this->assessmentService->archiveAssessment($assessment);

        return response()->json(["success" => "Assessment archived successfully.", "archivedAssessment" => $archivedAssessment]);
    }

    public function restoreAssessment($program, $course, $assessment)
    {

        $restoredAssessment = $this->assessmentService->restoreAssessment($assessment);

        return response()->json(["success" => "Assessment restored successfully.", "restoredAssessment" => $restoredAssessment]);
    }

    public function showAssessment($program, $course, Assessment $assessment)
    {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/ViewAssessment', [
            "programId" => $program,
            "courseId" => $course,
            "assessment" => fn() => $this->assessmentService->getAssessmentCompleteDetails($assessment)
        ]);
    }

    public function showEditQuizForm()
    {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/QuizForm');
    }
}
