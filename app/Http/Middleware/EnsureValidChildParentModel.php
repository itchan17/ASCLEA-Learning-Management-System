<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureValidChildParentModel
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // This middleware check if valid IDs in the url has a valid relationship
        // if not it will return a 404 error
        // Example: course id in the url is valid also the assessessment id 
        // but the asssesment has no relationship to that course so it must return 404

        $course = $request->route('course');
        $assessment = $request->route('assessment');
        $quiz = $request->route('quiz');
        $assessmentSubmission = $request->route('assessmentSubmission');

        if ($assessment->course_id !== $course->course_id) {
            abort(404);
        }
        if ($quiz && $quiz->assessment_id !== $assessment->assessment_id) {
            abort(404);
        }
        if ($assessmentSubmission && $assessmentSubmission->assessment->quiz->quiz_id !== $quiz->quiz_id) {
            abort(404);
        }

        return $next($request);
    }
}
