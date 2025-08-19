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
use Illuminate\Support\Facades\Auth;

class RegistrationController extends Controller
{

    // Render the registrion page
    public function show() {
        return Inertia::render('RegistrationPage/RegistrationPage');
    }

    // Create and authenticate user
    public function registerUser(Request $request)
    {

        // Get the returned value from validator method
        $validator = $this->validator($request->all());

        // Send an error message to front end
        if ($validator->stopOnFirstFailure()->fails()) {
            throw ValidationException::withMessages(['error' => $validator->errors()->first(),]);
        }

        // Get the id of student role
        $roleId = DB::table('roles')->where('role_name', 'student')->value('role_id');

        $data = $request->only([
            'first_name', 'last_name', 'middle_name', 'birthdate',
            'gender', 'contact_number', 'email',
            'house_no', 'region', 'province', 'city', 'barangay' // added region
        ]);

        $data['password'] = Hash::make($request->password);
        $data['role_id'] = $roleId;
        
        $user = User::create($data);

        // Trigger sending of email after user creation
        event(new Registered($user));
  
        // Autheticate created user
        Auth::login($user);
       
        return redirect()->route('dashboard.index');
    }

    private function validator($data) {

        $validator = Validator::make($data, [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'birthdate' => 'required|date',
            'gender' => 'required|in:male,female',
            'contact_number' => 'required|string|min:11|max:15',
            'email' => 'required|email|unique:users,email',
            'house_no' => 'required|string|max:255',
            'region' => 'required|string|max:255', // added region
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
        ], $messages = [
            'required' => 'Some fields are missing. Please complete all required fields.',
        ]);
       
        return $validator;
    }
   
}
