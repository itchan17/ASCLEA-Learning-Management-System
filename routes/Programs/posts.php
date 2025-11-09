<?php

use App\Http\Controllers\Programs\PostController;
use Illuminate\Support\Facades\Route;

Route::prefix('programs/{program}/courses/{course}')
    ->middleware(['auth', 'verified', 'preventBack'])
    ->group(function () {

        // Create post
        Route::post('/posts/create', [PostController::class, 'createPost'])->name('post.create');

        // Get all the posts
        Route::get('/posts', [PostController::class, 'getPosts'])->name('posts.get');
    });
