<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotifications(Request $request)
    {
        $notifcations = $request->user()
            ->notifications()
            ->select('id', 'notifiable_id', 'data', 'read_at', 'created_at')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json(['notifications' => $notifcations]);
    }
}
