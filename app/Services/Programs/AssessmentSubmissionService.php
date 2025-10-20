<?php

namespace App\Services\Programs;

use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\Quiz;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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
    public function updateQuizAssessmentSubmission(AssessmentSubmission $assessmentSubmission, int $totalScore, ?string $submittedAt = null)
    {
        $now = Carbon::now();
        $timeSpent = null;

        // Only runs quiz has set duration
        if ($assessmentSubmission->assessment->quiz && $assessmentSubmission->assessment->quiz->duration > 0) {

            // Calculate the time spent of the user in answering the quiz
            $start = Carbon::parse($assessmentSubmission->created_at)->timestamp;
            $submitTime = Carbon::parse($submittedAt ?? $now)->timestamp;

            $timeSpent = (int)(($submitTime - $start) / 60); // This is in minutes
        }

        // Parameter $submittedAt is use to specify the time submitted for auto submitting in AutoSubmitAbandonedQuiz scheduled task
        $assessmentSubmission->update([
            'score' => $totalScore,
            'submitted_at' => $submittedAt ?? $now,
            'time_spent' => $timeSpent
        ]);
    }

    public function getPrevQuizAssessmentSubmitted(User $user, AssessmentSubmission $assessmentSubmission)
    {
        if ($user->role->role_name !== "student") {

            // Get the first submitted assessment of the student based on the current assessmentSubmission
            // Check if the assessment was also submitted by the same user
            // The id used in submitted_by was assigned_course_id it's a unique identification for each user assigned to the course
            // It also ensure that the assessment that will be fetched is in the same course
            // Last condition makes sure the the assessment is a type of quiz
            return AssessmentSubmission::where('created_at', '<', $assessmentSubmission->created_at)->where('submitted_by', $assessmentSubmission->submitted_by)->whereHas('assessment.assessmentType', function ($query) {
                $query->where('assessment_type', 'quiz');
            })->with('assessment.quiz')->orderBy('created_at', 'desc')
                ->first();
        } else {
            return null;
        }
    }

    public function updateQuizAssessmentSubmissionScore(AssessmentSubmission $assessmentSubmission, int $totalScore)
    {
        $assessmentSubmission->update(["score" => $totalScore]);
    }

    public function formatInputData(Collection $questions)
    {

        $data = $questions->map(
            function ($question) {

                if (!is_null($question->studentAnswer)) {
                    $correctAnswers = $question->options->where('is_correct', true)->pluck('option_text')->map(function ($option) {
                        return Str::squish($option); // Str::squish() removes whites spaces and tabs 
                    });

                    return [
                        "question" => $question->question,
                        "correct_answers" => $correctAnswers,
                        "student_answer" => Str::squish($question->studentAnswer->answer_text)
                    ];
                }
            }
        )->filter()->values();

        return $data;
    }

    public function generateAndSaveStudentQuizResultFeedback(array $inputData, AssessmentSubmission $assessmentSubmission)
    {
        // Content that will be used to make request 
        $userContent = [
            "responses" => $inputData
        ];
        $systemContent = "You are a teaching assistant that gives personalized feedback based on student quiz performance. Return the feedback in this structure:\n\n\"feedback\": {\n  \"strengths\": [\"string\", \"string\", ...],\n  \"weaknesses\": [\"string\", \"string\", ...],\n  \"suggestions\": [\"string\", \"string\", ...]\n}";
        $model = "ft:gpt-4.1-mini-2025-04-14:asclea:student-quiz-result-feedback:CLgTtEyF";

        $data = AIFeedbackService::getFeedback($userContent, $systemContent, $model);

        // Save the feedback in the assessment submission data
        $assessmentSubmission->update(['feedback' => $data]);
    }

    public function saveQuizResultFeedback($data, AssessmentSubmission $assessmentSubmission) {}
}
