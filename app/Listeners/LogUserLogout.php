<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Logout;
use App\Models\UserLogin;

class LogUserLogout
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Logout $event): void
    {
        $lastLogin = $event->user->logins()->latest()->first();
        if ($lastLogin) {
            $lastLogin->update([
                'logout_at' => now(),
            ]);
        }
    }
}
