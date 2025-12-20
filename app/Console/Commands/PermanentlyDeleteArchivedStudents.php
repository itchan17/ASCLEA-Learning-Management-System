<?php

namespace App\Console\Commands;

use App\Models\Student;
use Illuminate\Console\Command;
use Carbon\Carbon;

class PermanentlyDeleteArchivedStudents extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:permanently-delete-archived-students';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete archived students that is over 30 days treshold';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Set the grace period for permanent deletion
        $threshholdDate = Carbon::now()->subDays(30);

        // Get the all the students passed the grace period
        $archivedStudents = Student::onlyTrashed()
            ->where("deleted_at", "<",  $threshholdDate)
            ->whereNull('permanently_deleted_at')
            ->get();

        // Check first if its not empty
        if ($archivedStudents->isNotEmpty()) {
            foreach ($archivedStudents as $student) {

                $student->permanently_deleted_at = now();
                $student->save();
            }
        }

        $this->info("Deleted {$archivedStudents->count()} courses permanently.");
    }
}
