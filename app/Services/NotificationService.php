<?php

namespace App\Services;

use App\Models\Notification;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class NotificationService
{
    private string $notificationRoute;

    public function __construct()
    {
        // Set the url where the nootification will be sent real time
        $this->notificationRoute = config('app.vite_main_url') . ':' . config('app.vite_socket_io_port') . '/notify';
    }

    public function notifyUser(string $userId, string $title, string $body, string $actionUrl)
    {
        // Creates notification in database
        $newNotification = Notification::create([
            'notifiable_id' => $userId,
            'notification_title' => $title,
            'notification_body' => $body,
            'action_url' => $actionUrl,
        ]);

        // Send notification in the socket server
        Http::post($this->notificationRoute, [
            'notifications' => [$newNotification]
        ]);
    }

    public function notifyUsers(array $userIds, string $title, string $body, string $actionUrl)
    {
        $notifications = [];

        foreach ($userIds as $userId) {
            $notifications[]  = [
                'notification_id' => Str::uuid(),
                'notifiable_id' => $userId,
                'notification_title' => $title,
                'notification_body' => $body,
                'read_at' =>  null,
                'action_url' => $actionUrl,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Save notifcation to database
        Notification::insert($notifications);

        // Send notification in the socket server
        Http::post($this->notificationRoute, [
            'notifications' =>  $notifications
        ]);
    }
}
