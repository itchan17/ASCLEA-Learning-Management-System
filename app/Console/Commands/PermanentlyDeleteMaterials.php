<?php

namespace App\Console\Commands;

use App\Models\Programs\Material;
use App\Services\Programs\MaterialService;
use Carbon\Carbon;
use Illuminate\Console\Command;

class PermanentlyDeleteMaterials extends Command
{

    protected $signature = 'app:permanently-delete-materials';
    protected $description = 'Peemanently delete material and its uploaded files.';

    protected MaterialService $materialService;

    // Inject assessment service to use the method for deleting the file
    public function __construct(MaterialService $materialService)
    {
        parent::__construct();
        $this->materialService = $materialService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Set the grace period for permanent deletion
        $threshholdDate = Carbon::now()->subDays(30);

        // Get the all the assessments passed the grace period
        $archivedMaterials = Material::onlyTrashed()->where("deleted_at", "<",  $threshholdDate)->with('materialFiles')->get();

        // Check first if its not empty
        if ($archivedMaterials->isNotEmpty()) {

            foreach ($archivedMaterials as $material) {

                // If material has files we have to delete it 
                if ($material->materialFiles->isNotEmpty()) {

                    // The method that will delete needs an array of ID
                    // We need to store the ID of the the file
                    $files = [];

                    foreach ($material->materialFiles as $index => $file) {

                        $files[$index] = $file->material_file_id;
                    }

                    // This is the method that will delete the files
                    // We will pass ehre the files array that contains file id
                    $this->materialService->removeMaterialFiles($files);
                }

                // Permemanently deleting the assessment
                $material->forceDelete();
            }
        }

        $this->info("Deleted {$archivedMaterials->count()} materials permanently.");
    }
}
