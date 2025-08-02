<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Program;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProgramController extends Controller
{
    // Display the program page
    public function index() {
        return Inertia::render('Programs/Programs', [
            'program_list' => Program::select('program_id', 'program_name', 'background_image')->latest()->get()
        ]);
    }

    public function store(Request $req) {

        // Validate input
        $validated = $req->validate([
            'program_name' => 'required|unique:programs,program_name|max:255',
            'program_description' => 'string|nullable',
        ]);
   
        // Create program
        $program = Program::create($validated);
       
        $course_list = $req->all()['course_list'];

        // Check if course_list is array and has value
        if (is_array($course_list) && !empty($course_list)) {
           foreach($course_list as $key => $course){
                $course['program_id'] = $program->program_id; // Add program_id FK
                Course::create($course); // Store course in courses table
           }
        }

        // Return a flash success 
        return back()->with('success', 'Program created successfully.');
    }

    // Handle updating the program details
    public function update(Request $req, Program $program) {

        $validated = $req->validate([
            'program_name'  => [
                'required',
                'max:255',
                Rule::unique('programs')->ignore($program->program_id, 'program_id'), // Ignore unique validation for current program that is updating
            ],
            'program_description' => 'string|nullable',
        ]);

        $program->update($validated);
        
        // Return a flash success 
        return back()->with('success', 'Program updated successfully.');
    }

    // Handle archiving program through soft delete
    public function archive(Program $program) {
    
        $program->delete(); 

        return to_route('programs.index')->with('success', 'Program archived successfully.');
    }

    // Show the selected program
    public function showProgram(Program $program) {
        // Return a prop containing the program data
        return Inertia::render('Programs/ProgramComponent/ProgramContent', [
            'program' => $program->only(['program_id', 'program_name', 'program_description', 'background_image']),
            'courses' => fn () => $program->courses() ->latest()->select(['course_id', 'course_code', 'course_name', 'course_description', 'updated_at'])->get(),
        ]);

    }

    // This function validates the added course in the program form
    public function validateAddedCourse(Request $req){
        $req->validate([ 
            'course_code' => "string|nullable",
            'course_name' => "required|string|max:255",
            'course_description' => "string|nullable",
            'course_day' => "string|nullable|required_with:start_time,end_time",
            'start_time' => "string|nullable|date_format:H:i|required_with:end_time",
            'end_time' => "string|nullable|date_format:H:i|after:start_time|required_with:start_time",
        ]);

        return back()->with('message', "Course validated successfully.");
    }

    public function updateBackground(Program $program, Request $req) {
        
        if($req->hasFile('background_image')){
            $image = $req->background_image;
            $filename = uniqid() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('programBackgroundImages', $filename, 'public');

            if ($program->background_image) {
                Storage::disk('public')->delete($program->background_image);
            }
            
            $program->background_image = $path;
            $program->save();

            return back()->with(['success' => 'Backgroung image updated successfully.']);
        }
       
        return back()->withErrors(['background_image' => 'No file uploaded.']);
    }
}
