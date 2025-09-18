<?php

namespace App\Policies\Programs;

use App\Models\Course;
use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentSubmission;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Access\Response;

class AssessmentSubmissionPolicy
{
    public function viewQuizInstruction(User $user, Assessment $assessment, Course $course): bool
    {
        // User is student
        // User was assigned in course
        // Assessment was published

        $isStudent = $user->role->role_name === "student";
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();
        $isPublished = $assessment->status === "published";

        $isAuthorized = $isCourseAssigned && $isPublished && $isStudent;

        return $isAuthorized;
    }

    public function viewQuizAnswerForm(User $user, Assessment $assessment, Course $course): bool
    {
        $isStudent = $user->role->role_name === "student";
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();
        $isPublished = $assessment->status === "published";


        $isAuthorized = $isCourseAssigned && $isPublished && $isStudent;

        return $isAuthorized;
    }

    public function validateRequiredQuestion(User $user, AssessmentSubmission $assessmentSubmission, Assessment $assessment, Course $course): bool
    {
        // User is student
        // Course is assigned
        // Assessment submission is not yet submitted
        // Assessment is not past due date

        $isStudent = $user->role->role_name === "student";
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();
        $isNotSubmitted = $assessmentSubmission->submitted_at === null;
        $isNotPastDueDate = $assessment->due_datetime > Carbon::now();
        $isPublished = $assessment->status === "published";
        $isAssessmentSubmissionAuthor = $assessmentSubmission->submittedBy->member->user->user_id === $user->user_id;

        $isAuthorized = $isStudent && $isCourseAssigned && $isNotSubmitted && $isNotPastDueDate && $isPublished &&  $isAssessmentSubmissionAuthor;

        return $isAuthorized;
    }

    public function viewSubmittedPage(User $user, Assessment $assessment, Course $course): bool
    {
        $isStudent = $user->role->role_name === "student";
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();
        $isPublished = $assessment->status === "published";

        $isAuthorized = $isCourseAssigned && $isPublished && $isStudent;

        return $isAuthorized;
    }

    public function submitQuiz(User $user, AssessmentSubmission $assessmentSubmission, Assessment $assessment): bool
    {
        $isAssessmentSubmissionAuthor = $assessmentSubmission->submittedBy->member->user->user_id === $user->user_id;
        $isAssessmentSubmissionNotYetSubmitted = is_null($assessmentSubmission->submitted_at);
        $isPublished = $assessment->status === "published";

        $isAuthorized = $isAssessmentSubmissionAuthor && $isAssessmentSubmissionNotYetSubmitted && $isPublished;

        return $isAuthorized;
    }

    public function viewQuizResult(User $user, AssessmentSubmission $assessmentSubmission, Assessment $assessment): bool
    {
        $isAssessmentSubmissionAuthor = $assessmentSubmission->submittedBy->member->user->user_id === $user->user_id;
        $isPublished = $assessment->status === "published";

        $isAuthorized = $isAssessmentSubmissionAuthor && $isPublished;

        return $isAuthorized;
    }
}
