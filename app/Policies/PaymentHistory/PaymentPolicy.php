<?php

namespace App\Policies\PaymentHistory;

use App\Models\PaymentHistory\Payment;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PaymentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function view(User $user, Payment $payment): bool
    {
        if ($user->role->role_name === 'admin') {
            return true; // Admin can view everything
        }

        // Students can only view their own payments
        if ($user->role->role_name === 'student' && $payment->user_id === $user->user_id) {
            return true;
        }

    }

    public function create(User $user): bool
    {
        return $user->role->role_name === 'admin';
    }

    public function update(User $user, Payment $payment): bool
    {
        return $user->role->role_name === 'admin';
    }

    public function delete(User $user, Payment $payment): bool
    {
        return $user->role->role_name === 'admin';
    }


}
