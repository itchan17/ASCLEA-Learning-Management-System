<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user()->load('role');

        // Map to camelCase keys expected by the frontend
        $userData = [
            'user_id' => $user->user_id,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'middleName' => $user->middle_name,
            'birthday' => $user->birthdate ? $user->birthdate : null,
            'gender' => $user->gender,
            'phone' => $user->contact_number,
            'email' => $user->email,
            'houseNoSt' => $user->house_no,
            'province' => $user->province,
            'city' => $user->city,
            'barangay' => $user->barangay,
            'role' => optional($user->role)->name,
        ];

        return Inertia::render('Profile/Profile', [
            'profile' => $userData,
        ]);
    }

    public function update(UpdateProfileRequest $request)
    {
        $user = $request->user();

        // Only the validated fields are allowed to be updated
        $data = $request->validated();

        $user->fill([
            'birthdate' => $data['birthday'] ?? $user->birthdate,
            'gender' => $data['gender'] ?? $user->gender,
            'contact_number' => $data['phone'] ?? $user->contact_number,
            'house_no' => $data['houseNoSt'] ?? $user->house_no,
            'province' => $data['province'] ?? $user->province,
            'city' => $data['city'] ?? $user->city,
            'barangay' => $data['barangay'] ?? $user->barangay,
        ]);

        $user->save();

        return back()->with('success', 'Profile updated successfully.');
    }
}
