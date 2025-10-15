<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;
use App\Models\Student;
use App\Models\Program;
use App\Models\LearningMember;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Administration\Staff;


class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role
     */
    public function index()
    {
        $authUser = auth()->user();

        // Get role name of the user
        $roleName = Role::where('role_id', $authUser->role_id)
                        ->value('role_name');
        
        // Dashboard stats
        $stats = [
            'total_students'    => User::join('roles', 'users.role_id', '=', 'roles.role_id')->where('roles.role_name', 'student')->count(),

            'total_educators'   => User::join('roles', 'users.role_id', '=', 'roles.role_id')->where('roles.role_name', 'faculty')->count(),

            'pending_enrollees' => Student::where('enrollment_status', 'pending')->count(),

            'online_students'   => 0, // optional
        ];

        // Number of Students per Program
        $studentsPerProgram = Program::select('program_id', 'program_name')
            ->withCount(['learningMembers as total_students' => function ($query) {
                $query->join('users', 'learning_members.user_id', '=', 'users.user_id')
                    ->join('roles', 'users.role_id', '=', 'roles.role_id')
                    ->where('roles.role_name', 'student');
            }])
            ->get();
        
        // Number Unique student user that logins daily for the last 7 days
        $dailyLogins = DB::table('user_logins')
            ->join('users', 'user_logins.user_id', '=', 'users.user_id')
            ->join('roles', 'users.role_id', '=', 'roles.role_id')
            ->where('roles.role_name', 'student')
            ->where('login_at', '>=', Carbon::now()->subDays(6)->startOfDay())
            ->select(DB::raw('DATE(login_at) as login_date'), DB::raw('COUNT(DISTINCT user_logins.user_id) as total'))
            ->groupBy('login_date')
            ->orderBy('login_date')
            ->get();

        // Fill missing dates with 0
        $dates = [];
        $counts = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $dates[] = $date;
            $counts[] = $dailyLogins->firstWhere('login_date', $date)?->total ?? 0;
        }

        // Fetch last 7 days of logins for students
        $startDate = Carbon::now()->subDays(6)->startOfDay();
        $endDate   = Carbon::now()->endOfDay();

        $logins = DB::table('user_logins')
            ->join('users', 'user_logins.user_id', '=', 'users.user_id')
            ->join('roles', 'users.role_id', '=', 'roles.role_id')
            ->where('roles.role_name', 'student')
            ->where('login_at', '>=', $startDate)
            ->select('user_logins.user_id', 'login_at', 'logout_at')
            ->get();

        // Prepare dates and counts for the Daily Login Counts and Average Time Per Day
        $dates = [];
        $dailyCounts = [];
        $avgTimePerDay = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $dates[] = $date;

            $dailyLogins = $logins->filter(fn($l) => Carbon::parse($l->login_at)->format('Y-m-d') === $date);

            // Daily login count (unique users)
            $dailyCounts[] = $dailyLogins->unique('user_id')->count();

            // Average session time
            $times = $dailyLogins->filter(fn($l) => $l->logout_at)->map(fn($l) => Carbon::parse($l->login_at)->diffInMinutes(Carbon::parse($l->logout_at)) / 60);

            /*if ($times->count()) {
                $avgMinutes = round($times->avg()); // average in minutes
                $hours = intdiv($avgMinutes, 60);   // full hours
                $minutes = $avgMinutes % 60;        // remaining minutes
                $avgTimePerDay[$date] = "{$hours}h {$minutes}m";
            } else {
                $avgTimePerDay[$date] = "0h 0m";
            }*/

            $avgTimePerDay[$date] = $times->count() ? round($times->avg(), 2) : 0;
        }

        // Fetch the total number of assigned courses to Faculty
        if ($roleName === 'faculty') {
            $staff = Staff::where('user_id', $authUser->user_id)
                ->withCount('assignedCourses')->first();
            $stats['assigned_courses'] = $staff?->assigned_courses_count ?? 0;
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
                'dates' => $dates,
                'counts' => $counts,
            ],
            'avgTimePerDay' => $avgTimePerDay,
        ]);
    }
}
