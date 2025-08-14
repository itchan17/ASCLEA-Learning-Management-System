<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\SaveAssessmentRequest;
use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentType;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function createAssessment(SaveAssessmentRequest $req, $program, $course) {
       
        $validatedAssessment = $req->validated();
   
        // Get the id of assessment types
        $typeId = AssessmentType::where('assessment_type', $validatedAssessment['assessment_type'])->value('assessment_type_id');

        // Set value of other columns
        $validatedAssessment['course_id'] = $course;
        $validatedAssessment['created_by'] = Auth::user()->user_id;
        $validatedAssessment['assessment_type_id'] = $typeId;

        $assessment = Assessment::create($validatedAssessment);


        if($req->hasFile("assessment_files"))
        {
            $uploadedFiles = [];
            foreach($req->assessment_files as $index => $file){
                // Store the files in private storage
                $filename = uniqid().'.'.$file->getClientOriginalExtension();
                $path = $file->storeAs('assessmentFiles', $filename);

                // Add the file data inside this array
                $uploadedFiles[$index] = [];
            }

            // Save the files data in the table
        }
    }

    public function showAssessment() {
            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/ViewAssessment');
    }
}
