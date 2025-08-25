<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\SaveAssessmentRequest;
use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentFile;
use App\Models\Programs\Quiz;
use App\Services\HandlingPrivateFileService;
use App\Services\Programs\AssessmentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
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
        // Check if user is authorized to create an assessment
        Gate::authorize('createAssessment', [Assessment::class, $course]);

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
        // Check if user can access the list of assessments
        Gate::authorize('getAssessments', [Assessment::class, $course]);

        $assessments = $this->assessmentService->getAssessments($course);

        return response()->json($assessments);
    }

    public function updateAssessment(SaveAssessmentRequest $req, $program, $course, Assessment $assessment)
    {
        // Check if user can update assessment
        Gate::authorize('updateAssessment', $assessment);

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
        // Check if user can unpublish assessment
        Gate::authorize('updateAssessment', $assessment);

        // Update the status of assessment
        // With true parameter indicating that the function was called for updating assessment status to draft
        $udpatedAssessment = $this->assessmentService->updateAssessment($assessment, [], true);

        // Get the updated data what will be returned in reponse
        $updatedAssessmentData = $this->assessmentService->getAssessmentCompleteDetails($udpatedAssessment);

        return response()->json(['success' => "Assessment unpublished sucessfully.", 'data' => $updatedAssessmentData]);
    }

    public function archiveAssessment($program, $course, Assessment $assessment)
    {

        // Check if user can unpublish assessment
        Gate::authorize('archiveAssessment', $assessment);

        $archivedAssessment = $this->assessmentService->archiveAssessment($assessment);

        return response()->json(["success" => "Assessment archived successfully.", "archivedAssessment" => $archivedAssessment]);
    }

    public function restoreAssessment($program, $course,  $assessment)
    {
        // Check if user can unpublish assessment
        Gate::authorize('restoreAssessment', [Assessment::class, $assessment]);

        $restoredAssessment = $this->assessmentService->restoreAssessment($assessment);

        return response()->json(["success" => "Assessment restored successfully.", "restoredAssessment" => $restoredAssessment]);
    }

    public function showAssessment($program, $course, Assessment $assessment)
    {
        // Check if user an view specific assessment
        Gate::authorize('viewAssessment', [Assessment::class, $course]);

        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/ViewAssessment', [
            "programId" => $program,
            "courseId" => $course,
            "assessment" => fn() => $this->assessmentService->getAssessmentCompleteDetails($assessment)
        ]);
    }

    public function viewFile($program, $course, $assessment, AssessmentFile $file)
    {
        // Check if user is authorize to access the view file page
        Gate::authorize('viewAssessmentFile', [Assessment::class, $course]);

        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/MaterialsComponents/ViewFile', [
            'fileName' => $file->file_name,
            'programId' => $program,
            'courseId' =>  $course,
            'assessmentId' => $assessment,
            'fileId' => $file->assessment_file_id
        ]);
    }

    public function streamAssessmentFile($program, $course, $assessment, AssessmentFile $file)
    {
        // Checks if the use is authorize to access the file
        Gate::authorize('viewAssessmentFile', [Assessment::class, $course]);

        // Use a service classs that returns the path of the private file            
        return   HandlingPrivateFileService::retrieveFile($file->file_path);
    }

    public function downloadAssessmentFile($program, $course, $assessment, AssessmentFile $file)
    {
        // Checks if the use user is authorize to downlaod teh file
        Gate::authorize('downloadAssessmentFile', [Assessment::class, $course]);

        // Use a service class that returns the file to be download
        return HandlingPrivateFileService::downloadFile($file->original_file_path, $file->file_name);
    }
}
