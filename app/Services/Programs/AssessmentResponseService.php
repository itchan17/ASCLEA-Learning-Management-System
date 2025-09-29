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

    public function generateQuestionFeedback(array $inputData)
    {
        $payload = [
            "prompt" => "Analyze the provided assessment data and generate a JSON response. 
            Fill in the 'feedback' object exactly in this structure:

            \"feedback\": {
            \"performance_analysis\": \"string\",
            \"performance_summary\": \"string\",
            \"suggestions\": [\"string\", \"string\", ...]
            }

            - 'performance_analysis': a detailed analysis of class performance,
            - 'performance_summary': a concise summary of key findings,
            - 'suggestions': an array of actionable recommendations.

            Return ONLY valid JSON in the exact same structure, without explanations, markdown, or extra text.",
            "assessment" => $inputData
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" . env('GEMINI_API_KEY'), [
            "contents" => [[
                "parts" => [[
                    // IMPORTANT: force JSON output
                    "text" => json_encode($payload)
                ]]
            ]]
        ]);

        $res = $response->json()['candidates'][0]['content']["parts"][0]["text"];

        // Remove markdown fences or any leading/trailing whitespace
        $res = trim($res);
        $res = preg_replace('/^```json|```$/m', '', $res);

        // Decode safely
        $data = json_decode($res, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            dd("JSON Error: " . json_last_error_msg(), $res);
        }

        return $data;
    }
}
