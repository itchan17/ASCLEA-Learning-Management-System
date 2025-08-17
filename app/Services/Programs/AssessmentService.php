<?php

namespace App\Services\Programs;

use App\Models\Course;
use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentFile;
use App\Models\Programs\AssessmentType;
use App\Models\Programs\Quiz;
use App\Services\PdfConverter;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AssessmentService
{

    public function saveAssessment(array $validatedAssessment, string $courseId)
    {

        // Get the id of assessment types
        $typeId = AssessmentType::where('assessment_type', $validatedAssessment['assessment_type'])->value('assessment_type_id');

        // Set value of other columns
        $validatedAssessment['course_id'] = $courseId;
        $validatedAssessment['created_by'] = Auth::user()->user_id;
        $validatedAssessment['assessment_type_id'] = $typeId;
        $validatedAssessment['total_points'] = empty($validatedAssessment['total_points'])  ? 0 : $validatedAssessment['total_points'];

        $assessment = Assessment::create($validatedAssessment);

        return $assessment;
    }

    public function saveAssessmentFiles(array $assessmentFiles, Assessment $assessment)
    {
        $uploadedFiles = [];
        $now = Carbon::now(); // Get current to use for timesptamps

        foreach ($assessmentFiles as $index => $file) {

            // Store the files in private storage
            $originalFilePath = $file->store('assessmentFiles');

            $mimeType = $file->getMimeType();
            $newFilePath = null;

            // Check if the file is pptx or docx type
            if (in_array($mimeType, [
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            ])) {

                $inputFile = storage_path('app/private/' . $originalFilePath); // Get the complete file path
                $fileName = pathinfo($originalFilePath, PATHINFO_FILENAME); // Get the file name
                $outputFile = storage_path('app/private/assessmentFiles/' . $fileName); // Set the file path and file name of the converted file

                // Custom fucntion that handle pdf conversion
                PdfConverter::convertToPdf($inputFile, $outputFile);

                // Set the new file path for the converted file
                $newFilePath = "assessmentFiles/" . $fileName . ".pdf";
            }

            $data = [
                'assessment_file_id' => (string) Str::uuid(),
                'assessment_id' => $assessment->assessment_id,
                'file_path' => $newFilePath ?? $originalFilePath, // Check for new file path, indicates the files was converted to pdf
                'original_file_path' => $originalFilePath, // Always save the original file path
                'file_name' => $file->getClientOriginalName(),
                'file_type' => $file->getClientMimeType(),
                'created_at' => $now,
                'updated_at' => $now,
            ];

            // Add the file data inside this array
            $uploadedFiles[$index] = $data;
        }

        // Save the files data in the table
        AssessmentFile::insert($uploadedFiles);
    }

    public function createInitialQuizForm(Assessment $assessment)
    {
        // Create the inital quiz that will be used to start form editing with initial quiz title
        $initialQuizDta = [
            'assessment_id' => $assessment->assessment_id,
            'quiz_title' => "New Quiz"
        ];

        Quiz::create($initialQuizDta);
    }

    public function getAssessments(string $courseId)
    {

        return Assessment::where('course_id', $courseId)->with('assessmentType')->with(['author' => function ($query) {
            $query->select('user_id', 'first_name', 'last_name');
        }])->with(['quiz' => function ($query) {
            $query->select('assessment_id', 'quiz_id', 'quiz_title');
        }])->orderBy('created_at', 'desc')->paginate(5);
    }
}
