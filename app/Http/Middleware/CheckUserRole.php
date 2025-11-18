<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();
        // Get the role_name from roles table using relationship
        $userRole = $request->user()->role->role_name;

        $skipValidation = false; 
        // Check if 'skipvalidation' is the last role argument
        if (!empty($roles) && end($roles) === 'skipvalidation') {
            $skipValidation = true;
            array_pop($roles);
        }

        // Check if the role of auth user is allowed in specified roles
        if(!in_array($userRole, $roles)) {
            abort(404, 'Resource not found');
        }

        // Additional check for students
        if ($userRole === 'student') {
            $enrollmentStatus = optional($user->student)->enrollment_status;
            if (!$skipValidation && $enrollmentStatus !== 'enrolled') {
                abort(404, 'Resource not found');
            }
        }

        return $next($request);
    }
}
