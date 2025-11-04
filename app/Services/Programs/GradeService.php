<?php

namespace App\Services\Programs;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;

class GradeService
{
    public function getStudentsToBeGraded(Request $request, Course $course)
    {
        $students = $course->assignedTo()
            ->select(
                'assigned_courses.*',
                'users.first_name',
                'users.last_name',
                'users.email'
            )
            ->join('learning_members', 'assigned_courses.learning_member_id', '=', 'learning_members.learning_member_id')
            ->join('users', 'learning_members.user_id', '=', 'users.user_id')
            ->join('roles', 'users.role_id', '=', 'roles.role_id')
            ->where('roles.role_name', 'student')
            ->with('grade');

        // Search by first or last name
        if ($search = $request->input('search')) {
            $students->where(function ($query) use ($search) {
                $query->where('users.first_name', 'like', "%{$search}%")
                    ->orWhere('users.last_name', 'like', "%{$search}%")
                    ->orWhereRaw("CONCAT(users.first_name, ' ', users.last_name) LIKE ?", ["%{$search}%"]);
            });
        }

        // Sort by last name
        if ($sortLastName = $request->input('lastName')) {
            $students->orderBy('users.last_name', $sortLastName);
        }

        // Sort by first name
        elseif ($sortFirstName = $request->input('firstName')) {
            $students->orderBy('users.first_name', $sortFirstName);
        } else {
            $students->orderBy('assigned_courses.created_at', 'asc')
                ->orderBy('assigned_courses.assigned_course_id', 'asc');
        }

        return $students->paginate(10, ['*'], 'page')->withQueryString();
    }
}
