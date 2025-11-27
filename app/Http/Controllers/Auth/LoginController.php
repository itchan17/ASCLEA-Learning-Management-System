<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{

    public function show () {

        return Inertia::render('LoginPage/Login');
    }

    public function loginUser (Request $request) {
        
        $credentials = $request->all();

        // Check if there's too many attempts
        // The method will return a response
        $response = $this->checkTooManyFailedAttempts();
        // If there's a response send it to client
        if ($response) {
            return $response;
        }

        // Validating user input
         $validator = Validator::make($credentials, [
                'email' => 'required|email',
                'password' => 'required'
            ],     
            $messages = [
                'required' => 'The :attribute field is required.',
        ]);

        // Send an error message to client if valid input
        if ($validator->stopOnFirstFailure()->fails()) {
            throw ValidationException::withMessages(['error' => $validator->errors()->first(),]);
            
        }

        // If auth failed run the Ratelimiter and return an error in client
        if (!Auth::attempt($credentials)) {

            // This will track the attempts of the user
            RateLimiter::hit($this->throttleKey(), 60);

            throw ValidationException::withMessages([
                'error' => 'The provided credentials do not match our records.',
            ]);
        }
 
        $request->session()->regenerate();  

        $user = $request->user();

        // Redirect student to admission page if not enrolled
        if ($user->role->role_name === 'student') {
            $enrollmentStatus = optional($user->student)->enrollment_status;
            
            if ($enrollmentStatus !== 'enrolled') {
                return redirect()->route('admission.index');
            }
        }

        return redirect()->route('dashboard.index');
    }

    public function throttleKey()
    {
        return Str::lower(request('email')) . '|' . request()->ip();
    }

  
    public function checkTooManyFailedAttempts()
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }
        
        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'error' => "Too many login attempts. Please try again in {$seconds} seconds.",
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
