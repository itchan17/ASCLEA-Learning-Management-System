<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\NewNotification;
use Illuminate\Support\Facades\Http;

class NotificationService
{
    public function notifyUser(User $user, string $title, string $body)
    {
        // Creates notification in database
        $user->notify(new NewNotification($title, $body));

        $newNotification = $user
            ->notifications()
            ->latest()
            ->select('id', 'notifiable_id', 'data', 'read_at', 'created_at')
            ->first();

        // Send notification in teh socket server
        Http::post(env("VITE_MAIN_URL") . ":" .  env("VITE_SOCKET_IO_PORT") . "/notify", [
            'notification' => $newNotification
        ]);
    }
}
