<?php

namespace App\Services\Programs;

use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\Question;
use App\Models\Programs\StudentQuizAnswer;
use Carbon\Carbon;
use Illuminate\Http\Request;

use function PHPSTORM_META\map;

class AssessmentResponseService
{
    public function getAssessmentResponsesSummary(Assessment $assessment)
    {
        $submissions = $assessment->assessmentSubmissions()->whereNotNull('submitted_at')->get();

        $totalScores = 0;
        $totalMinutes = 0;

        foreach ($submissions as $submission) {
            // Only get total minutes if the quiz has a set duration
            // Since if not set user can answer the quiz as long as the deadline has not past
            if ($assessment->quiz->duration > 0) {
                $start = Carbon::parse($submission->created_at)->timestamp;
                $end = Carbon::parse($submission->submitted_at)->timestamp;
                $answeringDurationMinutes = (int)(($end - $start) / 60); // Converts to minutes and get the whole value

                $totalMinutes += $answeringDurationMinutes;
            }

            $totalScores += $submission->score;
        }

        // Divide from the total count of submissions to get the average
        // then get the while number using (int)
        $averageScore = $submissions->count() > 0 ? round(($totalScores / $submissions->count()), 2) : 0;
        $averageTime =  $submissions->count() > 0 ? (int)($totalMinutes / $submissions->count()) : 0;

        $highestScore = $submissions->max('score') ?? 0;
        $lowestScore = $submissions->min('score') ?? 0;

        return [
            'average_score' => $averageScore,
            'average_time' => $averageTime,
            'highest_score' => $highestScore,
            'lowest_score' => $lowestScore,
        ];
    }

    public function getFrequentlyMissedQuestion(Assessment $assessment)
    {

        // Get the misses of each question
        $frequentMisses = StudentQuizAnswer::select('question_id')
            ->groupBy('question_id')
            ->selectRaw('COUNT(*) as total_attempts')
            ->selectRaw("SUM(CASE WHEN is_correct = 0 THEN 1 ELSE 0 END) as missed_count") // Calculate the number of misses per question
            ->whereHas('question', function ($q) use ($assessment) {
                $q->where('quiz_id', $assessment->quiz->quiz_id);
            })
            ->whereHas('assessmentSubmission', function ($q) {
                $q->whereNotNull('submitted_at');
            })
            ->with('question')
            ->orderByDesc('missed_count')
            ->orderBy('question_id')
            ->take(10)
            ->get()
            ->map(function ($row) {

                return [
                    'question_id' => $row->question_id,
                    'question' => $row->question->question,
                    'question_number' => $row->question->sort_order,
                    'missed_count' => $row->missed_count,
                    'missed_rate' => $row->miss_rate = $row->total_attempts > 0
                        ? round(($row->missed_count / $row->total_attempts) * 100, 0)
                        : 0,
                ];
            });


        return $frequentMisses;
    }

    public function getAssessmentResponses(Request $request, Assessment $assessment)
    {
        $responses = $assessment->assessmentSubmissions()->whereNotNull('submitted_at')->with('submittedBy.member.user', function ($query) {
            $query->select('user_id', 'first_name', 'last_name', 'profile_image');
        });

        if ($search = $request->input('search')) {
            $responses->whereHas('submittedBy.member.user', function ($query) use ($search) {
                $query->whereLike('first_name', "%$search%")
                    ->orWhereLike('last_name', "%$search%")
                    ->orwhereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$search}%"]); // Allows searching for both first and last name
            });
        }

        if ($sortScore = $request->input('sortScore')) {
            $responses->orderBy('score', $sortScore);
        }

        if ($sortTime = $request->input('sortTime')) {
            $responses->orderBy('time_spent', $sortTime);
        }

        return $responses->paginate(10, ['*'], 'page')->withQueryString()->through(function ($response) {
            return [
                'assessment_submission_id' => $response->assessment_submission_id,
                'created_at' => $response->created_at->format('Y-m-d H:i:s'),
                'submitted_at' => $response->submitted_at,
                'time_spent' => $response->time_spent,
                'score' => $response->score,
                'submitted_by' => $response->submittedBy->member->user,
            ];
        });
    }
}
