<?php

namespace App\Console\Commands;

use App\Models\Administration\Staff;
use Carbon\Carbon;
use Illuminate\Console\Command;

class PermanentlyDeleteArchivedStaff extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:permanently-delete-archived-staff';

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

        // Get the all the staff past the grace period
        $archivedStaff = Staff::onlyTrashed()->where("deleted_at", "<",  $threshholdDate)->get();

        // Check first if its not empty
        if ($archivedStaff->isNotEmpty()) {

            foreach ($archivedStaff as $staff) {

                // Permanently deleting the staff and user data
                $staff->user->forceDelete();
                $staff->forceDelete();
            }
        }

        $this->info("Deleted {$archivedStaff->count()} staff permanently.");
    }
}
