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
    protected $description = 'Delete archived staff that is over 30 days treshold';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Set the grace period for permanent deletion
        $threshholdDate = Carbon::now()->subDays(30);

        // Get the all the staff past the grace period
        $archivedStaff = Staff::onlyTrashed()
            ->where("deleted_at", "<",  $threshholdDate)
            ->whereNull('permanently_deleted_at')
            ->get();

        // Check first if its not empty
        if ($archivedStaff->isNotEmpty()) {

            foreach ($archivedStaff as $staff) {

                // Permanently deleting the staff and user data
                $staff->permanently_deleted_at = now();
                $staff->save();
            }
        }

        $this->info("Deleted {$archivedStaff->count()} staff permanently.");
    }
}
