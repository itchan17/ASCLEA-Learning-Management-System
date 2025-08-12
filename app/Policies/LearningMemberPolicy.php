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
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
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
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, LearningMember $learningMember): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        return $user->role->role_name === 'admin';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, LearningMember $learningMember): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, LearningMember $learningMember): bool
    {
        return false;
    }
}
