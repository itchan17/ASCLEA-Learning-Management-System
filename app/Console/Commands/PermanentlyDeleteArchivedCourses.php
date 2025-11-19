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
    protected $description = 'Command description';

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

                $program = Program::withTrashed()->findOrFail($course->program->program_id);

                // Get the number of archived courses of the program
                $numOfDeletedCourses = $program->courses()->onlyTrashed()->count();

                // Check if program was archived
                // If the number of archived courses is only 1, this mean the course to be deleted
                // is the last in the archived program so the program has to be deleted
                if (!is_null($program->deleted_at) && $numOfDeletedCourses ===  1) {
                    $program->forceDelete();
                } else {
                    $course->forceDelete();
                }
            }
        }

        $this->info("Deleted {$archivedCourses->count()} courses permanently.");
    }
}
