<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\SaveAssessmentRequest;
use App\Models\Course;
use App\Models\Program;
use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentFile;
use App\Services\HandlingPrivateFileService;
use App\Services\Programs\AssessmentResponseService;
use App\Services\Programs\AssessmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class AssessmentController extends Controller
{
    protected AssessmentService $assessmentService;
    protected AssessmentResponseService $assessmentResponseService;

    public function __construct(AssessmentService $assessmentService, AssessmentResponseService $assessmentResponseService)
    {
        $this->assessmentService = $assessmentService;
        $this->assessmentResponseService = $assessmentResponseService;
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

    public function restoreAssessment($program, $course,  $assessment)
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

    public function viewFile($program, $course, Assessment $assessment, AssessmentFile $file)
    {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/MaterialsComponents/ViewFile', [
            'fileName' => $file->file_name,
            'programId' => $program,
            'courseId' =>  $course,
            'assessmentId' => $assessment->assessment_id,
            'fileId' => $file->assessment_file_id
        ]);
    }

    public function streamAssessmentFile($program, $course, Assessment $assessment, AssessmentFile $file)
    {
        // Use a service classs that returns the path of the private file            
        return HandlingPrivateFileService::retrieveFile($file->file_path);
    }

    public function downloadAssessmentFile($program, $course, Assessment $assessment, AssessmentFile $file)
    {
        // Use a service class that returns the file to be download
        return HandlingPrivateFileService::downloadFile($file->original_file_path, $file->file_name);
    }

    public function showAssessmentResponse(Request $request, Program $program, Course $course, Assessment $assessment)
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
                'responses' => fn() =>  $this->assessmentResponseService->getAssessmentResponses($request, $assessment),
                'responsesCount' => fn() => $assessment->assessmentSubmissions()->count()
            ]
        );
    }

    public function quizResponsesFeedback(Request $request, Program $program, Course $course, Assessment $assessment)
    {
        $summary = $this->assessmentResponseService->getAssessmentResponsesSummary($assessment);
        $frequentlyMissedQuestions = $this->assessmentResponseService->getFrequentlyMissedQuestion($assessment)->toArray();

        $inputData = $this->assessmentResponseService->formatInputData($assessment, $summary, $frequentlyMissedQuestions);

        $feedback = $this->assessmentResponseService->generateAndSaveFeedback($inputData, $assessment);

        return response()->json($feedback);
    }
}
