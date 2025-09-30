<?php

namespace App\Console\Commands;

use App\Models\Programs\AssessmentSubmission;
use App\Services\Programs\AssessmentSubmissionService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class AutoSubmitAbandonedQuiz extends Command
{

    protected $signature = 'app:auto-submit-abandoned-quiz';
    protected $description = 'Command description';

    protected AssessmentSubmissionService $assessmentSubmissionService;

    // Inject assessment submission service to use the method for submitting the quiz
    public function __construct(AssessmentSubmissionService $service)
    {
        parent::__construct();
        $this->assessmentSubmissionService = $service;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();

        // Get the assessment submission with type of quiz
        // and is past the timer (end_at) or due date
        $assessmentSubmissions = AssessmentSubmission::whereNull('submitted_at')
            ->whereHas('assessment.assessmentType', function ($q) {
                $q->where('assessment_type', 'quiz');
            })->where(function ($query) use ($now) {
                $query->whereHas('assessment', function ($query) use ($now) {
                    $query->where('due_datetime', '<', $now);
                })->orWhere('end_at', '<', $now);
            })->get();


        // Submits all the quiz
        foreach ($assessmentSubmissions as $submission) {
            // Prevents race condition by keeping the submission latest
            DB::transaction(function () use ($submission) {
                $submission->refresh();

                if (is_null($submission->submitted_at)) {

                    $submittedAt = null;

                    // If quiz has duration set it means it has end at data
                    // we have to use that accurately set the submitted at
                    if ($submission->assessment->quiz->duration > 0) {
                        $submittedAt = $submission->end_at;
                    } else {
                        // If has no duration set we will use the due_datetime instead
                        $submittedAt = $submission->assessment->due_datetime;
                    }

                    $totalScore = $this->assessmentSubmissionService->getTotalScore($submission);
                    $this->assessmentSubmissionService->updateQuizAssessmentSubmission($submission, $totalScore, $submittedAt);
                }
            });
        }
    }
}
