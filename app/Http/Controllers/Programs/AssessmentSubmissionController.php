<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\RequiredQuestionRequest;
use App\Models\Course;
use App\Models\Programs\ActivityFile;
use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\Quiz;
use App\Services\HandlingPrivateFileService;
use App\Services\Programs\AssessmentSubmissionService;
use App\Services\Programs\QuestionService;
use Carbon\Carbon;
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

    public function showQuizResult(Request $request, Course $course, Assessment $assessment, Quiz $quiz, AssessmentSubmission $assessmentSubmission)
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
            'assessmentSubmission' => fn() => $assessmentSubmission->only(['assessment_id', 'assessment_submission_id', 'created_at', 'submitted_at', 'score', 'feedback', 'time_spent']),
            'assessment' => $assessment->only('assessment_id', 'created_by'),
            'quiz' => $quiz,
            'questions' => fn() => $this->questionService->getQuestions($quiz, $assessmentSubmission->assessment_submission_id,  $optionSlectedFields, $studentAnswerSelectedFields, false),
            'prevQuizAssessmentSubmitted' => fn() => $this->assessmentSubmissionService->getPrevQuizAssessmentSubmitted($request->user(), $assessmentSubmission),
            'studentData' => fn() => $assessmentSubmission->load([
                'submittedBy.member.user' => function ($query) {
                    $query->select('user_id', 'first_name', 'last_name', 'profile_image', 'email');
                },
            ])->submittedBy
                ->member
                ->user,
        ]);
    }

    public function quizResultFeedback(Request $request, Course $course, Assessment $assessment, Quiz $quiz, AssessmentSubmission $assessmentSubmission)
    {
        // Fields to be selected in student quiz answer data
        $optionSlectedFields = ['question_option_id', 'question_id', 'option_text', 'is_correct'];
        $studentAnswerSelectedFields = ['student_quiz_answer_id', 'assessment_submission_id', 'question_id', 'answer_id', 'answer_text', 'is_correct', 'feedback'];

        // This is for generating the quiz result feedback
        if (!is_null($assessmentSubmission->submitted_at) && is_null($assessmentSubmission->feedback)) {

            $questions = $this->questionService->getQuestions($quiz, $assessmentSubmission->assessment_submission_id,  $optionSlectedFields, $studentAnswerSelectedFields, false);

            $inputData =  $this->assessmentSubmissionService->formatInputData($questions)->toArray();

            $this->assessmentSubmissionService->generateAndSaveStudentQuizResultFeedback($inputData, $assessmentSubmission);
        }

        // Get the feedback from the database and convert in into an array
        $feedback = json_decode($assessmentSubmission->feedback, true);

        return response()->json($feedback);
    }

    public function uploadActivityFiles(Request $request, Course $course, Assessment $assessment)
    {
        if ($request->hasFile('activity_files')) {
            $assignedCourseId =  $this->assessmentSubmissionService->getAssignedCourseId($request->user(), $course->course_id);

            // Find or Create assessment submission when the user upload a file
            $assessmentSubmission = AssessmentSubmission::firstOrCreate([
                'assessment_id' => $assessment->assessment_id,
                'submitted_by' => $assignedCourseId
            ]);

            $this->assessmentSubmissionService->saveActivityFiles($request->activity_files, $assessmentSubmission);
        }
    }

    public function streamAcitvityFiles(Course $course, Assessment $assessment, ActivityFile $file)
    {
        return HandlingPrivateFileService::retrieveFile($file->file_path);
    }

    public function removeUploadedFile(Request $request, Course $course, Assessment $assessment, AssessmentSubmission $assessmentSubmission,  ActivityFile $file)
    {
        $this->assessmentSubmissionService->removeActivityFile($file);

        $this->assessmentSubmissionService->removeAssessmentSubmission($assessmentSubmission);
    }

    public function submitActivity(Request $request, Course $course, Assessment $assessment)
    {
        $assignedCourseId =  $this->assessmentSubmissionService->getAssignedCourseId($request->user(), $course->course_id);

        $this->assessmentSubmissionService->submitActivity($assignedCourseId, $assessment->assessment_id);
    }

    public function gradeActivity(Request $request, Course $course, Assessment $assessment, AssessmentSubmission $assessmentSubmission)
    {
        $validated = $request->validate([
            'grade' => 'required|numeric',
        ]);

        $assessmentSubmission->update(['score' => $validated['grade'], 'submission_status' => 'graded']);
    }

    public function returnActivity(Request $request, Course $course, Assessment $assessment)
    {
        $validated = $request->validate([
            'selectAll' => 'required|boolean',
            'selectedSubmittedActivities' => 'array',
            'unselectedSubmittedActivities' => 'array',
        ]);

        $this->assessmentSubmissionService->returnSubmittedActivities(
            $validated['selectAll'],
            $validated['selectedSubmittedActivities'] ?? [],
            $validated['unselectedSubmittedActivities'] ?? [],
            $assessment->assessment_id
        );
    }
}
