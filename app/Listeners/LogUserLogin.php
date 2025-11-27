<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use App\Models\UserLogin;

class LogUserLogin
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
    public function handle(Login $event): void
    {
        // Prevent duplicate entries within 2 seconds
        $recent = UserLogin::where('user_id', $event->user->user_id)
            ->where('login_at', '>=', now()->subSeconds(2))
            ->exists();

        if ($recent) {
            return; // Skip duplicate login event
        }

        UserLogin::create([
            'user_id' => $event->user->user_id,
            'login_at' => now(),
        ]);
    }
}
