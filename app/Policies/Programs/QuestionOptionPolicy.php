<?php

namespace App\Policies\Programs;

use App\Models\Programs\Assessment;
use App\Models\User;

class QuestionOptionPolicy
{
    // Determine wether user can create option
    public function createOption(User $user, Assessment $assessment): bool
    {
        // Only the author of the quiz assessment can view the quiz form
        $isAuthorized = $assessment->created_by === $user->user_id;

        return $isAuthorized;
    }

    // Determine wether user can udpate option
    public function updateOption(User $user, Assessment $assessment): bool
    {
        // Only the author of the quiz assessment can view the quiz form
        $isAuthorized = $assessment->created_by === $user->user_id;

        return $isAuthorized;
    }

    // Determine wether user can delete option
    public function deleteOption(User $user, Assessment $assessment): bool
    {
        // Only the author of the quiz assessment can view the quiz form
        $isAuthorized = $assessment->created_by === $user->user_id;

        return $isAuthorized;
    }
}
