<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Program;
use App\Services\Programs\GradeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CourseController extends Controller
{

    protected GradeService $gradeService;

    public function __construct(GradeService $gradeService)
    {
        $this->gradeService = $gradeService;
    }

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

        // Validate user input
        $validated = $this->validateCourse($req->all());

        $course->update($validated);

        return back()->with('success', 'Course updated successfully.');
    }

    // Archive course
    public function archive(Request $request, Program $program, Course $course)
    {
        $course->update([
            'archived_by' => $request->user()->user_id
        ]);

        $course->delete();

        return to_route('program.show', $course->program)->with('success', 'Course archived successfully.');
    }

    public function restoreCourse($programId, $courseId)
    {
        $course = Course::withTrashed()->findOrFail($courseId);
        $program = Program::withTrashed()->findOrFail($programId);

        // If program was archived restore it first
        if (!is_null($program->deleted_at)) {
            $program->restore();
            $program->update([
                'archived_by' => null
            ]);
        }

        $course->restore();
        $course->update([
            'archived_by' => null
        ]);

        return redirect()->back()->with('success', 'Course restored successfully.');
    }

    public function forceDeleteCourse($programId, $courseId)
    {
        $course = Course::withTrashed()->findOrFail($courseId);
        $program = Program::withTrashed()->findOrFail($programId);

        // Get the number of archived courses of the program
        $numOfDeletedCourses = $program->courses()->onlyTrashed()->count();

        // Check if program was archived
        // If the number of archived courses is only 1, this mean the course to be deleted
        // is the last in the archived program so the program has to be deleted
        if (!is_null($program->deleted_at) && $numOfDeletedCourses ===  1) {
            $program->forceDelete();
        } else {
            $course->forceDelete();
        }

        return redirect()->back()->with('success', 'Course was deleted permanently.');
    }

    // Show selected course
    public function showCourse(Request $request, Program $program, Course $course)
    {

        return Inertia::render(
            'Programs/ProgramComponent/CourseComponent/CourseContent',
            [
                'program' => fn() => $program->only(['program_id']),
                'course' => fn() => $course->only(['course_id', 'course_code', 'course_name', 'course_description', 'course_day', 'start_time', 'end_time']),
                'students' => fn()  =>  $this->gradeService->getStudentsToBeGraded($request, $course)
            ]
        );
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
