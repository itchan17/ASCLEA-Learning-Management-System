<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\RequiredQuestionRequest;
use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\Question;
use App\Models\Programs\Quiz;
use App\Services\Programs\AssessmentSubmissionService;
use App\Services\Programs\QuestionService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
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

            // Fields to be selected in student quiz answer data
            $optionSlectedFields = ['question_option_id', 'question_id', 'option_text'];
            $studentAnswerSelectedFields = ['student_quiz_answer_id', 'assessment_submission_id', 'question_id', 'answer_id', 'answer_text'];

            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/Components/QuizAnswerForm', [
                'courseId' => $course,
                'assessmentSubmission' => fn() => $assessmentSubmission->only(['assessment_id', 'assessment_submission_id', 'created_at', 'submitted_at']),
                'assessmentId' => $assessment,
                'quiz' => $quiz,
                'questions' => fn() => $this->questionService->getQuestions($quiz, $assessmentSubmission->assessment_submission_id, $optionSlectedFields, $studentAnswerSelectedFields, true)
            ]);
        }

        // Else redirect the user to the submitted page
        return redirect()->route('quizzes.quiz.submitted.page', [
            'course' => $course,
            'assessment' => $assessment,
            'quiz' => $quiz,
        ]);
    }

    // In the form request valdiates if all required questions was completed
    public function validateRequiredQuestions(RequiredQuestionRequest $request, $course, $assessment, Quiz $quiz)
    {
        // Redirect to the next page of the quiz using the page pass from the payload
        return redirect()->route('assessment.quizzes.quiz', [
            'course' => $course,
            'assessment' => $assessment,
            'quiz' => $quiz,
            'page' => $request->page
        ]);
    }

    public function showSubmittedPage(Request $request, $course, $assessment, Quiz $quiz)
    {
        $assignedCourseId =  $this->assessmentSubmisisonService->getAssignedCourseId($request->user(), $course);

        $assessmentSubmission = $this->assessmentSubmisisonService->getAssessmentSubmission($assignedCourseId, $assessment);

        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/Components/QuizSubmitted', [
            'courseId' => $course,
            'assessmentId' => $assessment,
            'quiz' => $quiz,
            'assessmentSubmission' => fn() => $assessmentSubmission->only(['assessment_id', 'assessment_submission_id', 'created_at', 'submitted_at'])
        ]);
    }

    public function submitQuiz(RequiredQuestionRequest $request, $course, $assessment, Quiz $quiz, AssessmentSubmission $assessmentSubmission)
    {
        $totalScore = $this->assessmentSubmisisonService->getTotalScore($assessmentSubmission);

        $this->assessmentSubmisisonService->updateAssessmentSubmission($assessmentSubmission, $totalScore);

        // Redirect to the submitted page
        return redirect()->route('quizzes.quiz.submitted.page', [
            'course' => $course,
            'assessment' => $assessment,
            'quiz' => $quiz,
        ]);
    }

    public function showQuizResult($course, $assessment, Quiz $quiz, AssessmentSubmission $assessmentSubmission)
    {
        // Fields to be selected in student quiz answer data
        $optionSlectedFields = ['question_option_id', 'question_id', 'option_text', 'is_correct'];
        $studentAnswerSelectedFields = ['student_quiz_answer_id', 'assessment_submission_id', 'question_id', 'answer_id', 'answer_text', 'is_correct', 'feedback'];


        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/Components/QuizResult', [
            'courseId' => $course,
            'assessmentSubmission' => fn() => $assessmentSubmission->only(['assessment_id', 'assessment_submission_id', 'created_at', 'submitted_at', 'score', 'feedback']),
            'assessmentId' => $assessment,
            'quiz' => $quiz,
            'questions' => fn() => $this->questionService->getQuestions($quiz, $assessmentSubmission->assessment_submission_id,  $optionSlectedFields, $studentAnswerSelectedFields, false)
        ]);
    }
}
