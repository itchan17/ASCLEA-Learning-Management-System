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

    public function viewAssessment(User $user, Assessment $assessment, string $courseId): bool
    {
        // User can view the assessment if he is an admin and author of the assessment or the assessment was published
        // If not admin to view the assessment the course should be assigned to the user and the author of the assessment or the assessment was published
        $isAdmin = $user->role->role_name == "admin";
        $isAuthor = $assessment->created_by === $user->user_id;
        $isPublished = $assessment->status === "published";
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($courseId) {
            $query->where('course_id', $courseId);
        })->exists();

        $isAuthorized = ($isAdmin && ($isAuthor || $isPublished)) || ($isCourseAssigned && ($isAuthor || $isPublished));

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

    public function viewAssessmentFile(User $user, Assessment $assessment, string $courseId): bool
    {
        // User can view the file if he is an admin and author of the assessment or the assessment was published
        // If not admin to view the file the course should be assigned to the user and the author of the assessment or the assessment was published
        $isAdmin = $user->role->role_name == "admin";
        $isAuthor = $assessment->created_by === $user->user_id;
        $isPublished = $assessment->status === "published";
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($courseId) {
            $query->where('course_id', $courseId);
        })->exists();

        $isAuthorized = ($isAdmin && ($isAuthor || $isPublished)) || ($isCourseAssigned && ($isAuthor || $isPublished));

        return $isAuthorized;
    }

    public function downloadAssessmentFile(User $user, Assessment $assessment, string $courseId): bool
    {
        // User can download the file if he is an admin and author of the assessment or the assessment was published
        // If not admin to download the file the course should be assigned to the user and userr is a faculty and the author of the assessment or the assessment was published
        $isAdmin = $user->role->role_name == "admin";
        $isFaculty = $user->role->role_name == "faculty";
        $isAuthor = $assessment->created_by === $user->user_id;
        $isPublished = $assessment->status === "published";
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($courseId) {
            $query->where('course_id', $courseId);
        })->exists();

        $isAuthorized = ($isAdmin && ($isAuthor || $isPublished)) || ($isFaculty && $isCourseAssigned && ($isAuthor || $isPublished));

        return $isAuthorized;
    }

    public function viewAssessmentResponses(User $user, Assessment $assessment,): bool
    {
        $isAuthor = $assessment->created_by === $user->user_id;
        $isAdmin = $user->role->role_name == "admin";

        $isAuthorized = $isAuthor || $isAdmin;

        return $isAuthorized;
    }

    public function generateQuizResponsesFeedback(User $user, Assessment $assessment,): bool
    {
        $isAuthor = $assessment->created_by === $user->user_id;
        $isAdmin = $user->role->role_name == "admin";

        $isAuthorized = $isAuthor || $isAdmin;

        return $isAuthorized;
    }

    public function downloadAssessmentResponsesData(User $user, Assessment $assessment): bool
    {
        $isAdmin = $user->role->role_name == "admin";
        $isAuthor = $assessment->created_by === $user->user_id;

        $isAuthorized = $isAdmin || $isAuthor;

        return $isAuthorized;
    }
}
