<?php

namespace App\Console\Commands;

use App\Models\Course;
use App\Models\Program;
use Carbon\Carbon;
use Illuminate\Console\Command;

class PermanentlyDeleteArchivedCourses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:permanently-delete-archived-courses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete archived courses that is over 30 days treshold';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Set the grace period for permanent deletion
        $threshholdDate = Carbon::now()->subDays(30);

        // Get the all the courses passed the grace period
        $archivedCourses = Course::onlyTrashed()->where("deleted_at", "<",  $threshholdDate)->get();

        // Check first if its not empty
        if ($archivedCourses->isNotEmpty()) {
            foreach ($archivedCourses as $course) {

                $course->permanently_deleted_at = now();
                $course->save();
            }
        }

        $this->info("Deleted {$archivedCourses->count()} courses permanently.");
    }
}
