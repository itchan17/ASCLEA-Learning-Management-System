<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Programs\Quiz;
use App\Services\Programs\AssessmentSubmissionService;
use App\Services\Programs\QuestionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentSubmissionController extends Controller
{

    protected QuestionService $questionService;
    protected AssessmentSubmissionService $assessmentSubmisisonService;

    public function __construct(QuestionService $questionService, AssessmentSubmissionService $assessmentSubmisisonService)
    {
        $this->questionService = $questionService;
        $this->assessmentSubmisisonService = $assessmentSubmisisonService;
    }

    public function showQuizInstruction(Request $request, $course, $assessment, Quiz $quiz)
    {
        $assignedCourseId =  $this->assessmentSubmisisonService->getAssignedCourseId($request->user(), $course);

        $assessmentSubmission = $this->assessmentSubmisisonService->getAssessmentSubmission($assignedCourseId, $assessment);

        // Checks if the user has already a submission data
        // Or if it has suibmission data but is not yet submitted 
        // This is to prevent user from accessing the quiz instruction page if already submitted
        if (!$assessmentSubmission || !$assessmentSubmission->submitted_at) {
            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/QuizInstruction', [
                'courseId' => $course,
                'assessmentId' => $assessment,
                'quiz' => $quiz
            ]);
        } else {
            return redirect()->route('quizzes.quiz.submitted.page', [
                'course' => $course,
                'assessment' => $assessment,
                'quiz' => $quiz,
            ]);
        }
    }

    public function showQuizAnswerForm(Request $request, $course, $assessment, Quiz $quiz)
    {
        $assignedCourseId =  $this->assessmentSubmisisonService->getAssignedCourseId($request->user(), $course);

        $assessmentSubmission = $this->assessmentSubmisisonService->getAssessmentSubmission($assignedCourseId, $assessment);

        // Check if user has a assessment submission data/user already stater the quiz
        // If not create a new data
        if (!$assessmentSubmission) {
            $assessmentSubmission = $this->assessmentSubmisisonService->createAssessmentSubmission($assignedCourseId, $assessment);
        }

        // If user already started the but its not yet submitted return the existing submission data
        if (!$assessmentSubmission->submitted_at) {
            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/Components/QuizAnswerForm', [
                'courseId' => $course,
                'assessmentSubmission' => $assessmentSubmission,
                'assessmentId' => $assessment,
                'quiz' => $quiz,
                'questions' => $this->questionService->getQuestions($quiz, $assessmentSubmission->assessment_submission_id)
            ]);
        }

        // Else redirect the user to the submitted page
        return redirect()->route('quizzes.quiz.submitted.page', [
            'course' => $course,
            'assessment' => $assessment,
            'quiz' => $quiz,
        ]);
    }

    public function showSubmittedPage($course, $assessment, Quiz $quiz)
    {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/Components/QuizSubmitted', [
            'courseId' => $course,
            'assessmentId' => $assessment,
            'quiz' => $quiz
        ]);
    }
}
