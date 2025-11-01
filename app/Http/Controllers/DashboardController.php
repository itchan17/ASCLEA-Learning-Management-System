<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;
use App\Models\Student;
use App\Models\Program;
use App\Models\LearningMember;
use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentSubmission;
use App\Models\Administration\Staff;
use App\Models\UserLogin;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $authUser = auth()->user();
        $roleName = Role::where('role_id', $authUser->role_id)->value('role_name');

        $stats = $this->getDashboardStats();

        $studentsPerProgram = $this->getStudentsPerProgram();

        [$dailyLoginDates, $dailyLoginCounts, $avgTimePerDay] = $this->getDailyLoginsAndAverageTime();

        $assessments = $accomplishedAssessments = $pendingAssessments = [];
        $totalLearningHours = $totalAssignedCourses = $totalSubmitted = $averageQuizScore = 0;
        $courseImprovementRates = [];
        $dailyTimeSpent = [];

        if ($roleName === 'faculty') {
            [$stats, $assessments, $dailyLoginDates, $dailyLoginCounts, $avgTimePerDay] =
            $this->getFacultyData($authUser, $stats);
        } elseif ($roleName === 'student') {
            [
                $dailyTimeSpent,
                $totalLearningHours,
                $totalAssignedCourses,
                $accomplishedAssessments,
                $pendingAssessments,
                $totalSubmitted,
                $averageQuizScore,
                $courseImprovementRates
            ] = $this->getStudentData($authUser);
        }

        return Inertia::render('Dashboard/Dashboard', [
            'authUser' => [
                'user_id'    => $authUser->id,
                'role'       => $roleName,
                'first_name' => $authUser->first_name,
            ],
            'stats' => $stats,
            'studentsPerProgram' => $studentsPerProgram,
            'dailyLogins' => [
                'dates' => $dailyLoginDates,
                'counts' => $dailyLoginCounts,
            ],
            'avgTimePerDay' => $avgTimePerDay,
            'dailyTimeSpent' => $dailyTimeSpent,
            'total_assigned_courses' => $totalAssignedCourses,
            'assessments' => $assessments,
            'accomplished_assessments' => $accomplishedAssessments,
            'pending_assessments' => $pendingAssessments,
            'total_submitted_assessments' => $totalSubmitted,
            'average_quiz_score' => $averageQuizScore,
            'courseImprovementRates' => $courseImprovementRates,
            'total_learning_hours' => $totalLearningHours,
        ]);
    }

    private function getDashboardStats()
    {
        return [
            'total_students'    => Student::where('enrollment_status', 'enrolled')->count(),
            'total_educators'   => User::join('roles', 'users.role_id', '=', 'roles.role_id')
                                       ->where('roles.role_name', 'faculty')->count(),
            'pending_enrollees' => Student::where('enrollment_status', 'pending')->count(),
            'online_students'   => 0, // optional
        ];
    }

    private function getStudentsPerProgram()
    {
        return Program::select('program_id', 'program_name')
            ->withCount(['learningMembers as total_students' => function ($query) {
                $query->join('users', 'learning_members.user_id', '=', 'users.user_id')
                    ->join('roles', 'users.role_id', '=', 'roles.role_id')
                    ->where('roles.role_name', 'student');
            }])
            ->get();
    }

    private function getDailyLoginsAndAverageTime($studentIds = null)
    {
        $query = DB::table('user_logins')
            ->join('users', 'user_logins.user_id', '=', 'users.user_id')
            ->join('roles', 'users.role_id', '=', 'roles.role_id')
            ->where('roles.role_name', 'student');

        // Filter only those students that belong to the faculty (if provided)
        if ($studentIds) {
            $query->whereIn('user_logins.user_id', $studentIds);
        }

        $logins = $query
            ->where('login_at', '>=', Carbon::now()->subDays(6)->startOfDay())
            ->select('user_logins.user_id', 'login_at', 'logout_at')
            ->get();

        $dates = [];
        $dailyCounts = [];
        $avgTimePerDay = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $dates[] = $date;

            $dailyLogins = $logins->filter(fn($l) => Carbon::parse($l->login_at)->format('Y-m-d') === $date);
            $dailyCounts[] = $dailyLogins->unique('user_id')->count();

            $times = $dailyLogins->filter(fn($l) => $l->logout_at)
                                ->map(fn($l) => Carbon::parse($l->login_at)
                                ->diffInMinutes(Carbon::parse($l->logout_at)) / 60);
            $avgTimePerDay[$date] = $times->count() ? round($times->avg(), 2) : 0;
        }

        return [$dates, $dailyCounts, $avgTimePerDay];
    }

    private function getFacultyData($authUser, $stats)
    {
        
    $staff = Staff::where('user_id', $authUser->user_id)
        ->withCount('assignedCourses')
        ->with('assignedCourses')
        ->first();

        $programCount = LearningMember::where('user_id', $authUser->user_id)
            ->distinct('program_id')
            ->count('program_id');

        $stats['assigned_programs'] = $programCount;
        $stats['assigned_courses'] = $staff?->assigned_courses_count ?? 0;

        $assignedCourseIds = $staff?->assignedCourses->pluck('course_id') ?? [];

        // Get the user IDs of students under this faculty’s courses to count the total students
        $studentIds = \App\Models\AssignedCourse::whereIn('course_id', $assignedCourseIds)
            ->join('learning_members', 'assigned_courses.learning_member_id', '=', 'learning_members.learning_member_id')
            ->join('users', 'learning_members.user_id', '=', 'users.user_id')
            ->join('roles', 'users.role_id', '=', 'roles.role_id')
            ->where('roles.role_name', 'student')
            ->distinct()
            ->pluck('learning_members.user_id')
            ->toArray();
        
        $stats['total_students'] = count($studentIds);

        // Fetch logins/time only for this faculty’s students
        [$dailyLoginDates, $dailyLoginCounts, $avgTimePerDay] = $this->getDailyLoginsAndAverageTime($studentIds);

        // Assessments data for faculty dashboard
        $assessments = \App\Models\Programs\Assessment::select('assessment_id', 'assessment_title')
            ->whereIn('course_id', $assignedCourseIds)
            ->withCount([
                'assessmentSubmissions as submitted_count' => fn($q) => $q->where('submission_status', 'submitted'),
                'assessmentSubmissions as returned_count'  => fn($q) => $q->where('submission_status', 'returned'),
                'assessmentSubmissions as not_submitted_count' => fn($q) => $q->where('submission_status', 'not_submitted'),
            ])
            ->get();

        // Return also the login/time data
        return [$stats, $assessments, $dailyLoginDates, $dailyLoginCounts, $avgTimePerDay];
    }

    private function getStudentData($authUser)
    {
        $studentLogins = UserLogin::where('user_id', $authUser->user_id)
                                  ->whereNotNull('logout_at')
                                  ->get();

        $dailyTimeSpent = $this->computeDailyTimeSpent($studentLogins);

        $totalLearningHours = round($studentLogins->sum(fn($login) =>
            Carbon::parse($login->login_at)->diffInMinutes(Carbon::parse($login->logout_at)) / 60, 2), 2);

        $totalAssignedCourses = LearningMember::where('user_id', $authUser->user_id)
            ->withCount('courses')->get()->sum('courses_count');

        $assignedCourseIds = LearningMember::where('user_id', $authUser->user_id)
            ->with('courses')->get()->pluck('courses')->flatten()->pluck('assigned_course_id')->toArray();

        $totalSubmitted = AssessmentSubmission::whereIn('submitted_by', $assignedCourseIds)
            ->whereIn('submission_status', ['submitted', 'returned'])->count();

        [$accomplishedAssessments, $pendingAssessments] = $this->getStudentAssessments($assignedCourseIds);

        $averageQuizScore = $this->computeAverageQuizScore($assignedCourseIds);

        $courseImprovementRates = $this->computeCourseImprovementRates($assignedCourseIds);

        return [
            $dailyTimeSpent,
            $totalLearningHours,
            $totalAssignedCourses,
            $accomplishedAssessments,
            $pendingAssessments,
            $totalSubmitted,
            $averageQuizScore,
            $courseImprovementRates
        ];
    }

    private function computeDailyTimeSpent($studentLogins)
    {
        $dailyTimeSpent = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');

            $loginsForDate = $studentLogins->filter(fn($login) =>
                Carbon::parse($login->login_at)->isSameDay($date));

            $totalHours = $loginsForDate->sum(fn($login) =>
                Carbon::parse($login->login_at)->diffInMinutes(Carbon::parse($login->logout_at)) / 60);

            $dailyTimeSpent[] = ['date' => $date, 'hours' => round($totalHours, 2)];
        }

        return $dailyTimeSpent;
    }

    private function getStudentAssessments($assignedCourseIds)
    {
        $accomplished = AssessmentSubmission::whereIn('submitted_by', $assignedCourseIds)
            ->whereIn('submission_status', ['submitted', 'returned'])
            ->with(['assessment' => fn($q) =>
                $q->select('assessment_id', 'assessment_title', 'due_datetime', 'course_id')
                  ->with(['course:course_id,course_name,course_code'])])
            ->select('assessment_submission_id', 'assessment_id', 'score', 'submitted_at', 'submission_status')
            ->latest('submitted_at')->paginate(5)
            ->through(fn($submission) => [
                'assessment_title' => $submission->assessment?->assessment_title ?? 'Untitled',
                'course_name' => $submission->assessment?->course?->course_name ?? 'Unknown Course',
                'course_code' => $submission->assessment?->course?->course_code ?? '-',
                'due_date' => $submission->assessment?->due_datetime ? Carbon::parse($submission->assessment->due_datetime)->format('F d, Y') : null,
                'score' => $submission->score ?? 0,
                'status' => ucfirst($submission->submission_status),
            ]);

        $pending = AssessmentSubmission::whereIn('submitted_by', $assignedCourseIds)
            ->where('submission_status', 'not_submitted')
            ->with(['assessment' => fn($q) =>
                $q->select('assessment_id', 'assessment_title', 'due_datetime', 'total_points', 'course_id')
                  ->with(['course:course_id,course_name,course_code'])])
            ->select('assessment_submission_id', 'assessment_id', 'submitted_by', 'submission_status')
            ->latest('assessment_submission_id')->paginate(5)
            ->through(fn($submission) => [
                'assessment_title' => $submission->assessment?->assessment_title ?? 'Untitled',
                'course_name' => $submission->assessment?->course?->course_name ?? 'Unknown Course',
                'course_code' => $submission->assessment?->course?->course_code ?? '-',
                'due_date' => $submission->assessment?->due_datetime ? Carbon::parse($submission->assessment->due_datetime)->format('F d, Y') : null,
                'possible_score' => $submission->assessment?->total_points ?? 0,
                'status' => ucfirst($submission->submission_status),
            ]);

        return [$accomplished, $pending];
    }

    private function computeAverageQuizScore($assignedCourseIds)
    {
        $submissions = AssessmentSubmission::whereIn('submitted_by', $assignedCourseIds)
            ->whereHas('assessment.assessmentType', fn($q) => $q->where('assessment_type', 'quiz'))
            ->whereNotNull('score')->with('assessment.quiz:quiz_id,assessment_id,quiz_total_points')
            ->get();

        $totalPercent = 0;
        $count = 0;

        foreach ($submissions as $submission) {
            $totalPoints = $submission->assessment->quiz->quiz_total_points ?? 0;
            if ($totalPoints > 0) {
                $totalPercent += ($submission->score / $totalPoints) * 100;
                $count++;
            }
        }

        return $count ? round($totalPercent / $count) : 0;
    }

    private function computeCourseImprovementRates($assignedCourseIds)
    {
        $submissions = AssessmentSubmission::whereIn('submitted_by', $assignedCourseIds)
            ->whereHas('assessment.assessmentType', fn($q) => $q->where('assessment_type', 'quiz'))
            ->whereNotNull('score')
            ->with(['assessment.quiz:quiz_id,assessment_id,quiz_total_points', 'assessment.course:course_id,course_name'])
            ->get()
            ->groupBy('assessment.course.course_name');

        $rates = [];

        foreach ($submissions as $courseName => $courseSubmissions) {
            $sorted = $courseSubmissions->sortBy('submitted_at');
            $half = ceil($sorted->count() / 2);
            $previous = $sorted->take($half);
            $current = $sorted->slice($half);

            $computeAvg = fn($set) => $set->reduce(function ($carry, $s) {
                $points = $s->assessment->quiz->quiz_total_points ?? 0;
                return $points > 0 ? $carry + ($s->score / $points) * 100 : $carry;
            }, 0) / max($set->count(), 1);

            $prevAvg = round($computeAvg($previous), 2);
            $currAvg = round($computeAvg($current), 2);

            $improvement = $prevAvg > 0 ? round((($currAvg - $prevAvg) / $prevAvg) * 100, 2) : 0;

            $rates[] = [
                'course_name' => $courseName,
                'previous_avg' => $prevAvg,
                'current_avg' => $currAvg,
                'improvement_rate' => $improvement,
            ];
        }

        return $rates;
    }
}
