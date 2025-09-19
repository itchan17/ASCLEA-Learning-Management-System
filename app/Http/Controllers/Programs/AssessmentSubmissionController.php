<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\RequiredQuestionRequest;
use App\Models\Course;
use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\Quiz;
use App\Services\Programs\AssessmentSubmissionService;
use App\Services\Programs\QuestionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentSubmissionController extends Controller
{

    protected QuestionService $questionService;
    protected AssessmentSubmissionService $assessmentSubmissionService;

    public function __construct(QuestionService $questionService, AssessmentSubmissionService $assessmentSubmissionService)
    {
        $this->questionService = $questionService;
        $this->assessmentSubmissionService = $assessmentSubmissionService;
    }

    public function showQuizInstruction(Request $request, Course $course, Assessment $assessment, Quiz $quiz)
    {
        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/QuizInstruction', [
            'courseId' => $course->course_id,
            'assessmentId' => $assessment->assessment_id,
            'quiz' => $quiz
        ]);
    }

    public function showQuizAnswerForm(Request $request, Course $course, Assessment $assessment, Quiz $quiz)
    {
        $assignedCourseId =  $this->assessmentSubmissionService->getAssignedCourseId($request->user(), $course->course_id);
        $assessmentSubmission = $this->assessmentSubmissionService->getAssessmentSubmission($assignedCourseId, $assessment->assessment_id);

        // Check if user has a assessment submission data/user already stater the quiz
        // If not create a new data
        if (!$assessmentSubmission) {
            $assessmentSubmission = $this->assessmentSubmissionService->createQuizAssessmentSubmission($assignedCourseId, $assessment->assessment_id, $quiz);
        }

        // If user already started the but its not yet submitted return the existing submission data
        if (!$assessmentSubmission->submitted_at) {

            // Fields to be selected in student quiz answer data
            $optionSlectedFields = ['question_option_id', 'question_id', 'option_text'];
            $studentAnswerSelectedFields = ['student_quiz_answer_id', 'assessment_submission_id', 'question_id', 'answer_id', 'answer_text'];

            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/Components/QuizAnswerForm', [
                'courseId' => $course->course_id,
                'assessmentSubmission' => fn() => $assessmentSubmission->only(['assessment_id', 'assessment_submission_id', 'created_at', 'end_at', 'submitted_at']),
                'assessmentId' => $assessment->assessment_id,
                'quiz' => $quiz,
                'questions' => fn() => $this->questionService->getQuestions($quiz, $assessmentSubmission->assessment_submission_id, $optionSlectedFields, $studentAnswerSelectedFields, true)
            ]);
        }

        // Else redirect the user to the submitted page
        return redirect()->route('quizzes.quiz.submitted.page', [
            'course' => $course->course_id,
            'assessment' => $assessment->assessment_id,
            'quiz' => $quiz,
        ]);
    }

    // In the form request valdiates if all required questions was completed
    public function validateRequiredQuestions(RequiredQuestionRequest $request, Course $course, Assessment $assessment, Quiz $quiz, AssessmentSubmission $assessmentSubmission)
    {
        // Redirect to the next page of the quiz using the page pass from the payload
        return redirect()->route('assessment.quizzes.quiz', [
            'course' => $course,
            'assessment' => $assessment,
            'quiz' => $quiz,
            'page' => $request->page
        ]);
    }

    public function showSubmittedPage(Request $request, Course $course, Assessment $assessment, Quiz $quiz)
    {
        $assignedCourseId =  $this->assessmentSubmissionService->getAssignedCourseId($request->user(), $course->course_id);

        $assessmentSubmission = $this->assessmentSubmissionService->getAssessmentSubmission($assignedCourseId, $assessment->assessment_id);

        // Redirect use to quiz instruction page
        // this is to ensure they cant access the submitted page without submitting the page
        if (!$assessmentSubmission || !$assessmentSubmission->submitted_at) {
            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/QuizInstruction', [
                'courseId' => $course->course_id,
                'assessmentId' => $assessment->assessment_id,
                'quiz' => $quiz
            ]);
        }

        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/Components/QuizSubmitted', [
            'courseId' => $course->course_id,
            'assessmentId' => $assessment->assessment_id,
            'quiz' => $quiz,
            'assessmentSubmission' => fn() => $assessmentSubmission->only(['assessment_id', 'assessment_submission_id', 'created_at', 'submitted_at'])
        ]);
    }

    public function submitQuiz(RequiredQuestionRequest $request, Course $course, Assessment $assessment, Quiz $quiz, AssessmentSubmission $assessmentSubmission)
    {
        $totalScore = $this->assessmentSubmissionService->getTotalScore($assessmentSubmission);

        $this->assessmentSubmissionService->updateQuizAssessmentSubmission($assessmentSubmission, $totalScore);

        inertia()->clearHistory();

        // Redirect to the submitted page
        return redirect()->route('quizzes.quiz.submitted.page', [
            'course' => $course,
            'assessment' => $assessment,
            'quiz' => $quiz,
        ]);
    }

    public function showQuizResult(Course $course, Assessment $assessment, Quiz $quiz, AssessmentSubmission $assessmentSubmission)
    {
        // Redirect use to quiz instruction page
        // this is to ensure they cant access the result without submitting the page
        if (!$assessmentSubmission->submitted_at) {
            return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/QuizInstruction', [
                'courseId' => $course->course_id,
                'assessmentId' => $assessment->assessment_id,
                'quiz' => $quiz
            ]);
        }

        // Fields to be selected in student quiz answer data
        $optionSlectedFields = ['question_option_id', 'question_id', 'option_text', 'is_correct'];
        $studentAnswerSelectedFields = ['student_quiz_answer_id', 'assessment_submission_id', 'question_id', 'answer_id', 'answer_text', 'is_correct', 'feedback'];

        return Inertia::render('Programs/ProgramComponent/CourseComponent/CourseContentTab/AssessmentsComponents/Features/QuizAnswerForm/Components/QuizResult', [
            'courseId' => $course->course_id,
            'assessmentSubmission' => fn() => $assessmentSubmission->only(['assessment_id', 'assessment_submission_id', 'created_at', 'submitted_at', 'score', 'feedback']),
            'assessmentId' => $assessment->assessment_id,
            'quiz' => $quiz,
            'questions' => fn() => $this->questionService->getQuestions($quiz, $assessmentSubmission->assessment_submission_id,  $optionSlectedFields, $studentAnswerSelectedFields, false)
        ]);
    }
}
