<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use App\Notifications\NewNotification;
use Illuminate\Support\Facades\Http;

class NotificationService
{

    public function notifyUser(User $user, string $title, string $body, string $actionUrl)
    {
        // Creates notification in database
        $newNotification = Notification::create([
            'notifiable_id' => $user->user_id,
            'notification_title' => $title,
            'notification_body' => $body,
            'action_url' => $actionUrl,
        ]);

        // Send notification in teh socket server
        $viteMainUrl = config('app.vite_main_url');
        $viteSocketIoPort =  config('app.vite_socket_io_port');
        $notificationRoute = "{$viteMainUrl}:{$viteSocketIoPort}/notify";

        Http::post($notificationRoute, [
            'notifications' => [$newNotification]
        ]);
    }

    public function notifyUsers(array $users, string $title, string $body) {}
}
