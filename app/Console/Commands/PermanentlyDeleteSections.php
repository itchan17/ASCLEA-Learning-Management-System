<?php

namespace App\Console\Commands;

use App\Models\Programs\Section;
use Carbon\Carbon;
use Illuminate\Console\Command;

class PermanentlyDeleteSections extends Command
{

    protected $signature = 'app:permanently-delete-sections';

    protected $description = 'Permanently delete sections and its contents.';

    public function handle()
    {
        // Set the grace period for permanent deletion
        $threshholdDate = Carbon::now()->subDays(30);

        // Get the all the sections passed the grace period
        $archivedSections = Section::onlyTrashed()->where("deleted_at", "<",  $threshholdDate)->get();

        // Check first if its not empty
        if ($archivedSections->isNotEmpty()) {

            foreach ($archivedSections as $section) {

                // Permemanently deleting the section
                $section->forceDelete();
            }
        }

        $this->info("Deleted {$archivedSections->count()} sections permanently.");
    }
}
