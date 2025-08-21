<?php

namespace App\Policies\Programs;

use App\Models\programs\Assessment;
use App\Models\User;

class AssessmentPolicy
{

    public function getAssessments(User $user, string $courseId): bool
    {
        // Check if user is an admin
        // If not check whether the user was assigned to the course
        $isAuthorized = $user->role->role_name == "admin" || $user->programs()->whereHas('courses', function ($query) use ($courseId) {
            $query->where('course_id', $courseId);
        })->exists();

        return $isAuthorized;
    }

    public function viewAssessment(User $user, string $courseId): bool
    {
        // Check if user is an admin
        // If not check whether the user was assigned to the course
        $isAuthorized = $user->role->role_name == "admin" || $user->programs()->whereHas('courses', function ($query) use ($courseId) {
            $query->where('course_id', $courseId);
        })->exists();

        return $isAuthorized;
    }

    public function createAssessment(User $user, string $courseId): bool
    {
        // Check if user is an admin
        // If not check whether the user is faculty and the course was assigned
        return $user->role->role_name === 'admin' || ($user->role->role_name === 'faculty' && $user->programs()->whereHas('courses', function ($query) use ($courseId) {
            $query->where('course_id', $courseId);
        })->exists());
    }

    public function updateAssessment(User $user, Assessment $assessment): bool
    {
        $isAuthorized = $assessment->created_by === $user->user_id;
        return  $isAuthorized;
    }

    public function archiveAssessment(User $user, Assessment $assessment): bool
    {
        $isAuthorized = $assessment->created_by === $user->user_id;
        return  $isAuthorized;
    }

    public function restoreAssessment(User $user, string $assessmentId): bool
    {
        // Get the instace of model since model binding
        // is not working for soft deleted data
        $assessment = Assessment::withTrashed()->findOrFail($assessmentId);

        $isAuthorized = $assessment->created_by === $user->user_id;
        return  $isAuthorized;
    }

    public function accessEditQuizForm(User $user, Assessment $assessment): bool
    {
        $isAuthorized = $assessment->created_by === $user->user_id;
        return  $isAuthorized;
    }
}
