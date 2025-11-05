<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        // Validate the form data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|min:10|max:1000',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            // Send the email
            Mail::send('emails.contact', [
                'name' => $request->name,
                'email' => $request->email,
                'messageContent' => $request->message,
                'timestamp' => now()->format('Y-m-d H:i:s')
            ], function ($message) use ($request) {
                $message->to(config('mail.from.address'))
                    ->from($request->email, $request->name)
                    ->subject('New Enrollment Request from ' . $request->name);
            });

            return redirect()->back()
                ->with('success', 'Thank you for your message! We will get back to you soon.');
                
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Sorry, there was an error sending your message. Please try again later.');
        }
    }
}