<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException; 
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Auth;

class RegistrationController extends Controller
{
    public function registerUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'birthdate' => 'required|date',
            'gender' => 'required|in:male,female',
            'contact_number' => 'required|string|min:11|max:15',
            'email' => 'required|email|unique:users,email',
            'house_no' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
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

        // Send an error message to front end
        if ($validator->stopOnFirstFailure()->fails()) {
            return redirect(route('register'))->withErrors(['message' => $validator->errors()->first(),]);        
        }

        // Get the id of student role
        $roleId = DB::table('roles')->where('role_name', 'student')->value('role_id');

        $data = $request->only([
            'first_name', 'last_name', 'middle_name', 'birthdate',
            'gender', 'contact_number', 'email',
            'house_no', 'province', 'city', 'barangay'
        ]);

        $data['password'] = Hash::make($request->password);
        $data['role_id'] = $roleId;

        $user = User::create($data);

        Auth::login($user);

        event(new Registered($user));
        // dd(Auth::check());
        //  return Auth::user();
        return redirect()->route('dashboard.index');
    }

    public function verifyEmail() {
       return Inertia::render('Auth/VerifyEmail');
    }

    public function verifyNotice (EmailVerificationRequest $request) {
        $request->fulfill();
        return redirect()->route('dashboard.index');
    }

    public function verifyHandler (Request $request) {
        $request->user()->sendEmailVerificationNotification();

        return back()->with('message', 'Verification link sent!');
    }
}
