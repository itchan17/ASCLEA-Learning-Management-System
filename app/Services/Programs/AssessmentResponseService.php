<?php

namespace App\Services\Programs;

use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\Question;
use App\Models\Programs\StudentQuizAnswer;
use App\Services\CalculationService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AssessmentResponseService
{

    protected CalculationService $calculationService;

    public function __construct(CalculationService $calculationService)
    {
        $this->calculationService = $calculationService;
    }

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
            'average_score' => [
                "score" => $averageScore,
                "percentage" => $this->calculationService->calculatePercentage($averageScore, $assessment->quiz->quiz_total_points)
            ],
            'average_time' => $this->calculationService->calculateHoursAndMins($averageTime),
            'highest_score' => [
                "score" => $highestScore,
                "percentage" =>  $this->calculationService->calculatePercentage($highestScore, $assessment->quiz->quiz_total_points)
            ],
            'lowest_score' => [
                "score" => $lowestScore,
                "percentage" =>  $this->calculationService->calculatePercentage($lowestScore, $assessment->quiz->quiz_total_points)
            ],
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
                        ? intval(round(($row->missed_count / $row->total_attempts) * 100, 0))
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

        if ($assessment->assessmentType->assessment_type === "quiz") {
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

        if ($assessment->assessmentType->assessment_type === "activity") {

            $responses->with('activityFiles', function ($query) {
                $query->select('activity_file_id', 'assessment_submission_id', 'file_path', 'file_name');
            });

            return $responses->paginate(10, ['*'], 'page')->withQueryString()->through(function ($response) {
                return [
                    'assessment_submission_id' => $response->assessment_submission_id,
                    'created_at' => $response->created_at->format('Y-m-d H:i:s'),
                    'submitted_at' => $response->submitted_at,
                    'submission_status' => $response->submission_status,
                    'score' => $response->score,
                    'submitted_by' => $response->submittedBy->member->user,
                    'activityFiles' => $response->activityFiles
                ];
            });
        }
    }

    public function formatInputData(Assessment $assessment, array $summary, array $frequentlyMissedQuestion)
    {
        // Map the array and return only the quesiton and the missed rate
        $updatedFrequentlyMissedQuestion = array_map(fn($question) => ['question' => $question['question'], 'missed_rate' => $question['missed_rate']], $frequentlyMissedQuestion);

        // Format the input data
        $assessment = [
            'assessment_title' => $assessment->assessment_title,
            'total_points' => $assessment->quiz->quiz_total_points,
            'summary' => $summary,
            'frequently_missed_question' => $updatedFrequentlyMissedQuestion
        ];

        return $assessment;
        // return json_encode($assessment);
    }

    public function generateAndSaveFeedback(array $inputData, Assessment $assessment)
    {
        $userContent = [
            'assessment' => $inputData
        ];
        $systemContent = "You are a teaching assistant that gives personalized feedback based on class assessment performance. Return the feedback in this structure:\n\n\"feedback\": {\n  \"performance_summary\": \"string\",\n  \"performance_analysis\": \"string\",\n  \"suggestions\": [\"string\", \"string\", ...]\n}";
        $model = "ft:gpt-4.1-mini-2025-04-14:asclea:admin-student-analytics-feedback:CMURmSbq";

        $data = AIFeedbackService::getFeedback($userContent, $systemContent, $model);

        $assessment->update(['feedback' => $data]);

        return json_decode($assessment->feedback, true);
    }
}
