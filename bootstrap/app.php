<?php

use App\Http\Middleware\CheckUserRole;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\PreventBack;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('web')->group(function () {
                require base_path('routes/auth.php');
                require base_path('routes/programs.php');
                require base_path('routes/admission.php');
                require base_path('routes/dashboard.php');
                require base_path('routes/grades.php');
                require base_path('routes/accounting.php');
                require base_path('routes/paymentHistory.php');
                require base_path('routes/administration.php');
                require base_path('routes/archives.php');
                require base_path('routes/profile.php');
            });
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
        $middleware->alias([
            'preventBack' => PreventBack::class,
            'checkRole' => CheckUserRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();