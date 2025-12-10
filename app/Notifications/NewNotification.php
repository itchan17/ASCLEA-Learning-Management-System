<?php

// app/Notifications/NewNotification.php
namespace App\Notifications;

use App\Channels\SocketChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewNotification extends Notification
{
    use Queueable;

    private $title;
    private $body;

    public function __construct($title, $body)
    {
        $this->title = $title;
        $this->body = $body;
    }

    public function via($notifiable)
    {
        return ['database']; // 'socket' is a custom channel
    }

    public function toDatabase($notifiable)
    {

        return [
            'title' => $this->title,
            'body' => $this->body,
        ];
    }

    public function toSocket($notifiable)
    {
        return [
            'notification_id' => $this->id,
            'user_id' => $notifiable->user_id,
            'title' => $this->title,
            'body' => $this->body,
        ];
    }
}
