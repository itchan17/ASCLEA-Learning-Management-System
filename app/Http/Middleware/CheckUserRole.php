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
        // Get the role_name from roles table using relationship
        $userRole = $request->user()->role->role_name;

        // Check if the role of auth user is allowed in specified roles
        if(!in_array($userRole, $roles)) {
            abort(404, 'Resource not found');
        }

        return $next($request);
    }
}
