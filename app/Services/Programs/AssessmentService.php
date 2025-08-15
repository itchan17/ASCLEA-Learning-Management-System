<?php

namespace App\Services\Programs;

use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentFile;
use App\Models\Programs\AssessmentType;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AssessmentService {

    public function saveAssessment(array $validatedAssessment, string $courseId) {

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

    public function saveAssessmentFiles(array $assessmentFiles, Assessment $assessment) {
         $uploadedFiles = [];
            $now = Carbon::now(); // Get current to use for timesptamps

            foreach($assessmentFiles as $index => $file){
          
                // Store the files in private storage
                $filePath = $file->store('assessmentFiles');
               
                $data = [
                    'assessment_file_id' => (string) Str::uuid(), 
                    'assessment_id' => $assessment->assessment_id,
                    'file_path' => $filePath,
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

    public function createQuizForm() {

    }
}