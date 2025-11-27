<?php

namespace App\Policies\Programs;

use App\Models\Programs\Assessment;
use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\StudentQuizAnswer;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class StudentQuizAnswerPolicy
{
    public function answerQuestion(User $user, AssessmentSubmission $assessmentSubmission): bool
    {
        $isAssessmentSubmissionAuthor = $assessmentSubmission->submittedBy->member->user->user_id === $user->user_id;
        $isAssessmentSubmissionNotYetSubmitted = is_null($assessmentSubmission->submitted_at);
        $isPublished = $assessmentSubmission->assessment->status === "published";

        $isAuthorized = $isAssessmentSubmissionAuthor && $isAssessmentSubmissionNotYetSubmitted && $isPublished;

        return $isAuthorized;
    }

    public function updateQuestionAnswer(User $user, AssessmentSubmission $assessmentSubmission): bool
    {
        $isAssessmentAuthor = $assessmentSubmission->assessment->author->user_id === $user->user_id;

        $isAuthorized = $isAssessmentAuthor;

        return $isAuthorized;
    }

    public function generateQuestionFeedback(User $user, AssessmentSubmission $assessmentSubmission)
    {
        $isAssessmentSubmissionAuthor = $assessmentSubmission->submittedBy->member->user->user_id === $user->user_id;

        return $isAssessmentSubmissionAuthor;
    }
}
