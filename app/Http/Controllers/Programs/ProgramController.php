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

class ProgramController extends Controller
{
    // Display the program page
    public function show() {
        $programList = Program::select('program_id', 'program_name', 'program_description')->latest()->get();

        return Inertia::render('Programs/Programs', [
            'program_list' => $programList
        ]);
    }

    public function store(Request $req) {
        // Throw an error if try to access by unauthorized user
        Gate::authorize('create', Program::class);

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
        
        // Throw an error if try to access by unauthorized user
        Gate::authorize('update', Program::class);

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
        // Throw an error if try to access by unauthorized user
        Gate::authorize('delete', Program::class);

        $programToArchive = Program::find($program->program_id);  
        $programToArchive->delete(); 

        return to_route('programs.index')->with('success', 'Program archived successfully.');
    }

    // Show the selected program
    public function showProgram(Program $program) {
        // Return a prop containing the program data
        return Inertia::render('Programs/ProgramComponent/ProgramContent', [
            'program' => $program->only(['program_id', 'program_name', 'program_description']),
        ]);

    }

    // This function validates the added course in the program form
    public function validateAddedCourse(Request $req){
        $req->validate([ 
            'course_code' => "string|nullable",
            'course_name' => "required|string|max:255",
            'course_description' => "string|nullable",
            'course_day' => "string|nullable",
            'start_time' => "string|nullable|date_format:H:i",
            'end_time' => "string|nullable|date_format:H:i|after:start_time",
        ]);

        return back()->with('message', "Course validated successfully.");
    }
}
