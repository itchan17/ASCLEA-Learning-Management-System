<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\ContactMessageMail;

class ContactController extends Controller
{
    /**
     * Handle contact form submission and send email.
     */
    public function submit(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        try {
            // Use env-configured recipient; default to global from address
            $toAddress = env('MAIL_TO_ADDRESS', config('mail.from.address'));
            $toName = env('MAIL_TO_NAME', config('mail.from.name'));

            // Force SMTP mailer to avoid accidental use of the log driver
            Mail::mailer('smtp')->to($toAddress, $toName)->send(
                new ContactMessageMail($data['name'], $data['email'], $data['message'])
            );

            Log::info('Contact email sent', [
                'to' => $toAddress,
                'from' => config('mail.from.address'),
                'username' => env('MAIL_USERNAME'),
            ]);

            // Redirect back for Inertia to treat as a successful visit
            return back()->with('contactSubmitted', true);
        } catch (\Throwable $e) {
            Log::error('Contact email failed', [
                'error' => $e->getMessage(),
            ]);
            return back()->with('contactSubmitted', false)->with('contactError', 'Email failed to send.');
        }
    }
}