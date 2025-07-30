<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Program;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // Create a course
    public function store(Program $program, Request $req) {

        // Validate user input
        $validated =  $req->validate([ 
            'course_code' => "string|nullable",
            'course_name' => "required|string|max:255",
            'course_description' => "string|nullable",
            'course_day' => "string|nullable|required_with:start_time,end_time",
            'start_time' => "string|nullable|date_format:H:i|required_with:end_time",
            'end_time' => "string|nullable|date_format:H:i|after:start_time|required_with:start_time",
        ]);

        // Add the goreign key
        $validated['program_id'] = $program->program_id;

        Course::create($validated);
        
        return back()->with('success', 'Course created successfully.');
    }
}
