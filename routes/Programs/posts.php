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

        // Update post
        Route::put('/posts/{post}', [PostController::class, 'updatePost'])->name('post.update');

        // Unpublish post
        Route::put('/posts/{post}/unpublish', [PostController::class, 'unpublishPost'])->name('post.unpublish');

        // Archive post
        Route::delete('/posts/{post}', [PostController::class, 'archivePost'])->name('post.archive');

        /// Restoree post
        Route::put('/posts/{post}/restore', [PostController::class, 'restorePost'])->name('post.restore');
    });
