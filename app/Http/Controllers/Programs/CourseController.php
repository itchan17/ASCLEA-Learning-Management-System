<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CourseController extends Controller
{

    // Create a course
    public function store(Program $program, Request $req)
    {

        // Validate user input
        $validated = $this->validateCourse($req->all());

        // Add the foreign key
        $validated['program_id'] = $program->program_id;

        Course::create($validated);

        return back()->with('success', 'Course created successfully.');
    }

    // Update course
    public function update(Program $program, Course $course, Request $req)
    {
        if ($course->program_id === $program->program_id) {
            // Validate user input
            $validated = $this->validateCourse($req->all());

            $course->update($validated);

            return back()->with('success', 'Course updated successfully.');
        } else {
            abort(404);
        }
    }

    // Archive course
    public function archive(Program $program, Course $course)
    {
        if ($course->program_id === $program->program_id) {
            $course->delete();

            return to_route('program.show', $course->program)->with('success', 'Course archived successfully.');
        } else {
            abort(404);
        }
    }

    // Show selected course
    public function showCourse(Program $program, Course $course)
    {
        if ($course->program_id === $program->program_id) {
            return Inertia::render(
                'Programs/ProgramComponent/CourseComponent/CourseContent',
                [
                    'program' => fn() => $program->only(['program_id']),

                    'course' => fn() => $course->only(['course_id', 'course_code', 'course_name', 'course_description', 'course_day', 'start_time', 'end_time']),
                ]
            );
        } else {
            abort(404);
        }
    }

    public function validateCourse($data)
    {
        $validator = Validator::make($data, [
            'course_code' => "string|nullable",
            'course_name' => "required|string|max:255",
            'course_description' => "string|nullable",
            'course_day' => "string|nullable|required_with:start_time,end_time",
            'start_time' => "string|nullable|date_format:H:i|required_with:end_time",
            'end_time' => "string|nullable|date_format:H:i|after:start_time|required_with:start_time",
        ]);

        // Send an error message to front end
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        return $validator->validated();
    }
}
