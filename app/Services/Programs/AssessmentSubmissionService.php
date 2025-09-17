<?php

namespace App\Services\Programs;

use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\Quiz;
use App\Models\User;
use Carbon\Carbon;

class AssessmentSubmissionService
{

    public function getAssignedCourseId(User $user, string $courseId,)
    {
        // Get the assigned course id of the user
        // It will be used for getting record in the assessmnt submisisons
        $assignedCourseId = $user
            ->programs()
            ->with(['courses' => function ($query) use ($courseId) {
                $query->where('course_id', $courseId);
            }])
            ->get()
            ->pluck('courses.*.assigned_course_id')
            ->flatten()
            ->first();

        return $assignedCourseId;
    }

    public function getAssessmentSubmission(string $assignedCourseId, string $assesmentId)
    {
        $assessmentSubmission = AssessmentSubmission::where('assessment_id', $assesmentId)->where('submitted_by', $assignedCourseId)->first();

        return $assessmentSubmission;
    }

    // This create the initial data of the assessment submission when the user start answering the quiz
    public function createQuizAssessmentSubmission(string $assignedCourseId, string $assessmentId, Quiz $quiz)
    {
        $endAt = null;

        // Check if quiz has a timer then set the end time
        if ($quiz->duration > 0) {
            $endAt = Carbon::now()->addMinutes($quiz->duration);
        }

        $assessmentSubmission =  AssessmentSubmission::create(
            [
                'assessment_id' => $assessmentId,
                'submitted_by' => $assignedCourseId,
                'end_at' => $endAt
            ]
        );

        return $assessmentSubmission;
    }

    public function getTotalScore(AssessmentSubmission $assessmentSubmission)
    {
        $answers = $assessmentSubmission->quizAnswers()->with('question')->get();

        $totalScore = 0;

        foreach ($answers as $answer) {
            if ($answer->is_correct) {
                $totalScore += $answer->question->question_points;
            }
        }

        return $totalScore;
    }

    // This is use for updating the assessment submission of the quiz when the quiz was actually submitted
    public function updateQuizAssessmentSubmission(AssessmentSubmission $assessmentSubmission, int $totalScore)
    {
        $assessmentSubmission->update([
            'score' => $totalScore,
            'submitted_at' => Carbon::now()
        ]);
    }
}
