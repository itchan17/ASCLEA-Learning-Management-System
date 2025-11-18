<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Controller;

class VerificationController extends Controller
{
    public function verifyEmail() {
       return Inertia::render('Auth/VerifyEmail');
    }

    public function verifyEmailNotice (EmailVerificationRequest $request) {
        $request->fulfill();

        $user = $request->user();

        // If user is a student, direct to admission first for admission approval
        if ($user->role->role_name === 'student') {
            return redirect()->route('admission.index'); // changed from dashboard to admission.index
        }

        // Otherwise (admin and faculty), go directly to dashboard
        return redirect()->route('dashboard.index');
    }

    public function verifyEmailHandler (Request $request) {
        $request->user()->sendEmailVerificationNotification();

        return back()->with('message', 'Verification link sent!');
    }
}
