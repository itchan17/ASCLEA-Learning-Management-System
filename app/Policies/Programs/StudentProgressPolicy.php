<?php

namespace App\Policies\Programs;

use App\Models\Course;
use App\Models\StudentProgress;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class StudentProgressPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function doneUndoneSectionItem(User $user, Course $course): bool
    {
        $isStudent = $user->role->role_name == "student";
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();

        return $isStudent && $isCourseAssigned;
    }
}
