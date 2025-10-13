<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;
use App\Models\Student;
use App\Models\Program;         
use App\Models\LearningMember;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role
     */
    public function index()
    {
        $authUser = auth()->user();

        // Get role name
        $roleName = Role::where('role_id', $authUser->role_id)
                        ->value('role_name');

        // Dashboard stats
        $stats = [
            'total_students'    => User::join('roles', 'users.role_id', '=', 'roles.role_id')
                                       ->where('roles.role_name', 'student')
                                       ->count(),

            'total_educators'   => User::join('roles', 'users.role_id', '=', 'roles.role_id')
                                       ->where('roles.role_name', 'faculty')
                                       ->count(),

            'pending_enrollees' => Student::where('enrollment_status', 'pending')->count(),

            'online_students'   => 0, // optional
        ];

        // Students per program
        $studentsPerProgram = Program::select('program_id', 'program_name')
            ->withCount(['learningMembers as total_students' => function ($query) {
                $query->join('users', 'learning_members.user_id', '=', 'users.user_id')
                    ->join('roles', 'users.role_id', '=', 'roles.role_id')
                    ->where('roles.role_name', 'student');
            }])
            ->get();

        return Inertia::render('Dashboard/Dashboard', [
            'authUser' => [
                'user_id'    => $authUser->id,
                'role'       => $roleName,
                'first_name' => $authUser->first_name,
            ],
            'stats' => $stats,
            'studentsPerProgram' => $studentsPerProgram,
        ]);
    }
}
