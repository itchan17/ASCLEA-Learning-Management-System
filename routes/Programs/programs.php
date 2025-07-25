<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use function Pest\Laravel\json;

Route::prefix('programs')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        
        // Programs index page
        Route::get('/', function () {
            return Inertia::render('Programs/Programs');
        })->middleware(['checkRole:admin,faculty,student'])->name('programs.index');
    
        Route::post('/', function (Request $req) {
            return response()->json(['message' => 'Success']);
        });
});



       