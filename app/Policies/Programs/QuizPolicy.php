<?php

namespace App\Policies\Programs;

use App\Models\Programs\Assessment;
use App\Models\User;

class QuizPolicy
{
    // Determine wether the user can access the edit quiz form of the assessment
    public function viewEditQuizForm(User $user, Assessment $assessment): bool
    {
        // Only the author of the quiz assessment can view the quiz form
        $isAuthorized = $assessment->created_by === $user->user_id;

        return $isAuthorized;
    }

    // Determine wether use can update the quiz details
    public function updateQuiz(User $user, Assessment $assessment): bool
    {
        // Only the author of the quiz assessment can edit the quiz form
        $isAuthorized = $assessment->created_by === $user->user_id;

        return $isAuthorized;
    }
}
