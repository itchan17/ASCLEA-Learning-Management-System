<?php

namespace Database\Seeders;

use App\Models\AssignedCourse;
use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentSubmission;
use App\Services\Programs\AssessmentSubmissionService;
use App\Services\Programs\StudentQuizAnswerService;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssessmentSubmissionSeeder extends Seeder
{

    protected AssessmentSubmissionService $assessmentSubmissionService;
    protected StudentQuizAnswerService $studenQuizAnswerService;

    public function __construct(AssessmentSubmissionService $assessmentSubmissionService, StudentQuizAnswerService $studenQuizAnswerService)
    {
        $this->assessmentSubmissionService = $assessmentSubmissionService;
        $this->studenQuizAnswerService = $studenQuizAnswerService;
    }


    public function run(): void
    {
        // Must be a valid course and assessment
        $courseId = '01990ee0-96b6-70cd-b4e7-622d64d9acfd';
        $assessmentId = '01995b9c-a26e-71b9-8684-c661b0ec38c1';

        $studentsAssignedToCourse = AssignedCourse::where('course_id', $courseId)->whereHas('member.user.role', function ($q) {
            $q->where('role_name', 'student');
        })->get();
        $assessment = Assessment::where('assessment_id', $assessmentId)->first();
        $quiz = $assessment->quiz;
        $questions = $quiz->questions()
            ->with('options')
            ->get();


        // Loop through each student and answer the quiz
        foreach ($studentsAssignedToCourse as $student) {

            // Create first the submission
            $assessmentSubmission = $this->assessmentSubmissionService->createQuizAssessmentSubmission($student->assigned_course_id, $assessment->assessment_id, $quiz);

            // Loop through questions and answer each
            foreach ($questions as $question) {
                // To get an answer
                // We need to get a random number from 0 and the count of options
                // This will be use to get a random answer from the options using the index
                $optionIndex = rand(0, $question->options->count() - 1);
                $answer = null;

                if ($question->question_type === "identification") {
                    // For identifcation type of question
                    // user dont pass id to check the answer but we use a text instead
                    // so we will get the text
                    $answer = $question->options[$optionIndex]->option_text;
                } else {
                    // For other types we get the option id as answer
                    $answer = $question->options[$optionIndex]->question_option_id;
                }

                // Check if answer is correct
                $isAnswerCorrect = $this->studenQuizAnswerService->checkAnswer($question,  $answer);

                // Then create the data in the database
                $this->studenQuizAnswerService->createOrUpdateQuestionAnswer($assessmentSubmission->assessment_submission_id, $question->question_id,  $isAnswerCorrect, $answer,  $question->question_type);
            }

            // Submit the quiz

            // Get the total score first
            $totalScore = $this->assessmentSubmissionService->getTotalScore($assessmentSubmission);
            $submittedAt = null;

            // This means the quiz a has a set duration
            if ($quiz->duration > 0) {
                $start = Carbon::parse($assessmentSubmission->created_at)->timestamp;
                $end = Carbon::parse($assessmentSubmission->end_at)->timestamp;

                // We need to get a random time stamp that is between the start time and the end time 
                $submittedAt = Carbon::createFromTimestamp(rand($start, $end))->setTimezone('Asia/Manila');
            } else {
                // If no duration set we will just get the current time
                $submittedAt = Carbon::now();
            }

            // This will update the assessment submission data with the latest records
            $this->assessmentSubmissionService->updateQuizAssessmentSubmission($assessmentSubmission, $totalScore, $submittedAt);
        }
    }
}
