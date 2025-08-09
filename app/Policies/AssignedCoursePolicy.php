<?php

namespace App\Policies;

use App\Models\AssignedCourse;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AssignedCoursePolicy
{
    /**
     * Determine whether the user can view any courses to be assigned.
     */
    public function viewAny(User $user): bool
    {
        return $user->role->role_name === 'admin';
    }

    /**
     * Determine whether the user can assign a course.
     */
    public function assignCourse(User $user): bool
    {
         return $user->role->role_name === 'admin';
    }

    /**
     * Determine whether the user remove assigned course.
     */
    public function removeAssignedCourse(User $user): bool
    {
         return $user->role->role_name === 'admin';
    }
}
