<?php

namespace App\Policies\Programs;

use App\Models\Programs\Assessment;
use App\Models\Programs\Question;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class QuestionPolicy
{
    // Determine wether user can create a question in a quiz
    public function createQuestion(User $user, Assessment $assessment): bool
    {
        // Only the author of the quiz assessment can view the quiz form
        $isAuthorized = $assessment->created_by === $user->user_id;

        return $isAuthorized;
    }

    // Determine wether user can update question
    public function updateQuestion(User $user, Assessment $assessment): bool
    {
        // Only the author of the quiz assessment can view the quiz form
        $isAuthorized = $assessment->created_by === $user->user_id;

        return $isAuthorized;
    }

    // Determine wether user can delete question
    public function deleteQuestion(User $user, Assessment $assessment): bool
    {
        // Only the author of the quiz assessment can view the quiz form
        $isAuthorized = $assessment->created_by === $user->user_id;

        return $isAuthorized;
    }
}
