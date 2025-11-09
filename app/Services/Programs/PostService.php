<?php

namespace App\Services\Programs;

use App\Models\Programs\Post;

class PostService
{
    public function savePost(array $validatedData, string $courseId, string $userId)
    {
        $validatedData['course_id'] = $courseId;
        $validatedData['created_by'] = $userId;

        $post = Post::create($validatedData);

        return $post;
    }

    public function listPosts(string $courseId, string $userId)
    {
        $postList = Post::where('course_id', $courseId)
            ->with(['author' => function ($query) {
                $query->select('user_id', 'first_name', 'last_name');
            }])
            ->where(function ($query) use ($userId) {
                $query->where('created_by', $userId)
                    ->orWhere('status', 'published');
            })
            ->withTrashed()
            ->where(function ($query) use ($userId) {
                $query->whereNull('deleted_at')
                    ->orWhere('created_by', $userId);
            })
            ->orderBy('created_at', 'desc')
            ->orderBy('Post_id', 'desc')
            ->paginate(5);


        return $postList;
    }
}
