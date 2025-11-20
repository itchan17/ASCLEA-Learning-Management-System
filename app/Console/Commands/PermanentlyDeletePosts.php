<?php

namespace App\Console\Commands;

use App\Models\Programs\Post;
use Carbon\Carbon;
use Illuminate\Console\Command;

class PermanentlyDeletePosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:permanently-delete-posts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Set the grace period for permanent deletion
        $threshholdDate = Carbon::now()->subDays(30);

        // Get the all the posts passed the grace period
        $archivedPosts = Post::onlyTrashed()->where("deleted_at", "<",  $threshholdDate)->get();

        // Check first if its not empty
        if ($archivedPosts->isNotEmpty()) {

            foreach ($archivedPosts as $post) {

                // Permemanently deleting the post
                $post->forceDelete();
            }
        }

        $this->info("Deleted {$archivedPosts->count()} posts permanently.");
    }
}
