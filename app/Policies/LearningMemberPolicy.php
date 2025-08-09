<?php

namespace App\Policies;

use App\Models\LearningMember;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class LearningMemberPolicy
{
    // Determine whether the user can access the list of users in the add member form
    public function accessUsersToAdd (User $user): bool
    {
        return $user->role->role_name === 'admin';
    }

    // Determine whether the user can add member in the pogram
    public function addMember (User $user): bool
    {
        return $user->role->role_name === 'admin';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user): bool
    {
        $role = $user->role?->role_name;
        return in_array($role, ['admin', 'faculty'], true);
    }

    /**
     * Determine whether the user can remove member.
     */
    public function removeMember(User $user): bool
    {
        return $user->role->role_name === 'admin';
    }
}
