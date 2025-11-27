<?php

namespace App\Policies\Programs;

use App\Models\Course;
use App\Models\User;

class GradePolicy
{
    // Determine wether user can assign a grade
    public function assignGrade(User $user, Course $course): bool
    {
        $isAdmin = $user->role->role_name === 'admin';
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();
        $isFacultyAssigned = $user->role->role_name === 'faculty' &&  $isCourseAssigned;

        return $isAdmin || $isFacultyAssigned;
    }

    // Determine wether user can return student grade
    public function returnGrades(User $user, Course $course): bool
    {
        $isAdmin = $user->role->role_name === 'admin';
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();
        $isFacultyAssigned = $user->role->role_name === 'faculty' &&  $isCourseAssigned;

        return $isAdmin || $isFacultyAssigned;
    }

    // Determine wether user can download student grades
    public function downloadGrades(User $user, Course $course): bool
    {
        $isAdmin = $user->role->role_name === 'admin';
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();
        $isFacultyAssigned = $user->role->role_name === 'faculty' &&  $isCourseAssigned;

        return $isAdmin || $isFacultyAssigned;
    }

    // Determine wether user can access annd view the grades page
    public function accessGrades(User $user): bool
    {
        $isEnnrolled = $user->student ? $user->student->enrollment_status === 'enrolled' : false;
        $isStudent = $user->role->role_name === 'student' && $user->student;

        return $isStudent && $isEnnrolled;
    }
}
