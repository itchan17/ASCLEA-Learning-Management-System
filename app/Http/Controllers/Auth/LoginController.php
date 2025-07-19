<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{

    public function show () {
        // if(Auth::check()){
        //     return redirect()->intended(route('dashboard.index'));
        // }

        return Inertia::render('LoginPage/Login');
    }

     public function loginUser (Request $request) {
        $credentials = $request->all();

        // Add validation logic here
        // ...

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            
            return redirect()->intended(route('dashboard.index'));
        }
 
        return back()->withErrors([
            'message' => 'The provided credentials do not match our records.',
        ]);
    }
}
