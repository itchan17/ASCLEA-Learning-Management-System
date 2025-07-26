<?php 

namespace App\Http\Controllers\Auth; 

use App\Http\Controllers\Controller;
use Illuminate\Http\Request; 
use Carbon\Carbon; 
use App\Models\User; 
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ForgotPasswordController extends Controller
{   
      public function showForgetPasswordForm()
      {
         return Inertia::render('LoginPage/Emailverification');
      }

      public function submitForgetPasswordForm(Request $request)
      {
   
        $request->validate([
              'email' => 'required|email|exists:users',
        ]);

        // Remove the row in pasword_resets_tokens table to enable resending reset link
        DB::table('password_reset_tokens')->where(['email'=> $request->email])->delete();

        // Generate token
        $token = Str::random(64);

        // Create data in password_reset_tokens table
        DB::table('password_reset_tokens')->insert([
            'email' => $request->email, 
            'token' => $token, 
            'created_at' => Carbon::now()
        ]);

        // This send an password reset email to the user containing the token
        Mail::send('emails.forgetPassword', ['token' => $token], function($message) use($request){
            $message->to($request->email);
            $message->subject('Reset Password');
        });

        return back()->with('success', 'We have e-mailed your password reset link!');
       
      }

      public function showResetPasswordForm($token) 
      { 
         return Inertia::render('LoginPage/Changepassword', ['token' => $token]);
      }

      public function submitResetPasswordForm(Request $request)
      {
        // Valdiate the user inputs
        $request->validate([
              'password' => [
                    'required',
                    'confirmed',
                     Password::min(8)
                            ->letters()
                            ->mixedCase()
                            ->numbers()
                            ->symbols()
                    ],   
        ]);

        // Get the row in pasword_resets_tokens table
        $updatePassword = DB::table('password_reset_tokens')
                            ->where([
                            'token' => $request->token
                            ])
                            ->first();

        // Check if the row exists else return an error
        if(!$updatePassword){
             throw ValidationException::withMessages([
                'error' => ['Invalid or expired token.'],
            ]);
        }

        // Update the password in Users table
        $user = User::where('email', $updatePassword->email)
                    ->update(['password' => Hash::make($request->password)]);

        // Remove the row in pasword_resets_tokens table
        DB::table('password_reset_tokens')->where(['email'=> $updatePassword->email])->delete();

        return redirect('login')->with('success', 'Your password has been changed!');
      }
}