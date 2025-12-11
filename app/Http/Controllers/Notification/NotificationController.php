<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotifications(Request $request)
    {
        $notifcations = $request->user()
            ->notifications()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['notifications' => $notifcations]);
    }

    public function readNotification(Notification  $notification)
    {
        $notification->update(['read_at' => now()]);

        $updatedNotification = $notification->refresh();

        return response()->json(['notification' => $updatedNotification]);
    }
}
