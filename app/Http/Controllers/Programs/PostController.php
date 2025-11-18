<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Program;
use App\Models\Programs\Post;
use App\Services\Programs\PostService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected PostService $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function createPost(Request $request, Program $program, Course $course)
    {
        $validatedData = $request->validate([
            'post_title' => 'required|string|max:255',
            'post_description' => 'nullable|string',
            'status' => 'required|in:published,draft',
        ]);

        $newPost = $this->postService->savePost($validatedData, $course->course_id, $request->user()->user_id);

        return response()->json(['success' => "Post created successfully.", 'data' => $newPost]);
    }

    public function getPosts(Request $request, Program $program, Course $course)
    {
        $postList = $this->postService->listPosts($course->course_id, $request->user()->user_id);

        return response()->json($postList);
    }
}
