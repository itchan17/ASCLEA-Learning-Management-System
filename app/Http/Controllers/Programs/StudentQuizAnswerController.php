<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\Question;
use App\Models\Programs\StudentQuizAnswer;
use App\Services\Programs\AssessmentSubmissionService;
use App\Services\Programs\StudentQuizAnswerService;
use Illuminate\Http\Request;

class StudentQuizAnswerController extends Controller
{

    protected StudentQuizAnswerService $studentQuizAnswerService;
    protected AssessmentSubmissionService $assessmentSubmissionService;

    public function __construct(StudentQuizAnswerService $studentQuizAnswerService, AssessmentSubmissionService $assessmentSubmissionService)
    {
        $this->studentQuizAnswerService = $studentQuizAnswerService;
        $this->assessmentSubmissionService = $assessmentSubmissionService;
    }

    public function answerQuestion(Request $request, $course, AssessmentSubmission $assessmentSubmission, Question $question)
    {
        $validated = $request->validate([
            'answer' => 'nullable|string',
        ]);

        $isAnswerCorrect = $this->studentQuizAnswerService->checkAnswer($question, $validated['answer']);

        $answer = $this->studentQuizAnswerService->createOrUpdateQuestionAnswer($assessmentSubmission->assessment_submission_id, $question->question_id, $isAnswerCorrect, $validated['answer'], $question->question_type);

        return response()->json(['message' => "Question answered sucessfully.", 'answer' => $answer ? $answer->only(['student_quiz_answer_id', 'assessment_submission_id', 'question_id', 'answer_id', 'answer_text']) : null]);
    }

    public function markAnswerCorrectIncorrect(Request $request, Course $course, AssessmentSubmission $assessmentSubmission, Question $question, StudentQuizAnswer $studentQuizAnswer)
    {
        $validated = $request->validate([
            'isCorrect' => 'boolean',
        ]);

        $this->studentQuizAnswerService->updateAnswerCorrectness($studentQuizAnswer, $validated["isCorrect"]);
        $totalScore = $this->assessmentSubmissionService->getTotalScore($assessmentSubmission);
        $this->assessmentSubmissionService->updateQuizAssessmentSubmissionScore($assessmentSubmission, $totalScore);
    }

    public function questionAnswerFeedback(Request $request, Course $course, AssessmentSubmission $assessmentSubmission, Question $question, StudentQuizAnswer $studentQuizAnswer)
    {
        // Ensure the assessment is submitted
        if (is_null($assessmentSubmission->submitted_at)) {
            return response()->json([
                'message' => 'You can only generate feedback after submitting the assessment.'
            ], 400);
        }

        // Prevent regenerating existing feedback
        if (!is_null($studentQuizAnswer->feedback)) {
            return response()->json([
                'message' => 'Feedback has already been generated for this question.'
            ], 400);
        }

        $data = $this->studentQuizAnswerService->formatInputData($studentQuizAnswer);

        $feedback = $this->studentQuizAnswerService->generateAndSaveStudentPerQuestionFeedback($data, $studentQuizAnswer);

        return response()->json($feedback);
    }
}
