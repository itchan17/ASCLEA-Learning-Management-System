<?php

namespace App\Console\Commands;

use App\Models\Programs\Assessment;
use App\Services\Programs\AssessmentService;
use Carbon\Carbon;
use Illuminate\Console\Command;

class PermanentlyDeleteAssessments extends Command
{
    protected $signature = 'app:permanently-delete-assessments';
    protected $description = 'Peemanently delete assessment and its uploaded files.';

    protected AssessmentService $assessmentService;

    // Inject assessment service to use the method for deleting the file
    public function __construct(AssessmentService $assessmentService)
    {
        parent::__construct();
        $this->assessmentService = $assessmentService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Set the grace period for permanent deletion
        $threshholdDate = Carbon::now()->subDays(30);

        // Get the all the assessments passed the grace period
        $archivedAssessments = Assessment::onlyTrashed()->where("deleted_at", "<",  $threshholdDate)->with('files')->get();

        // Check first if its not empty
        if ($archivedAssessments->isNotEmpty()) {

            foreach ($archivedAssessments as $assessment) {

                // If assessment has files we have to delete it 
                if ($assessment->files->isNotEmpty()) {

                    // The method that will delete needs an array of ID
                    // We need to store the ID of the the file
                    $files = [];

                    foreach ($assessment->files as $index => $file) {

                        $files[$index] = $file->assessment_file_id;
                    }

                    // This is the method that will delete the files
                    // We will pass ehre the files array that contains file id
                    $this->assessmentService->removeAssessmentFiiles($files);
                }

                // Permemanently deleting the assessment
                $assessment->forceDelete();
            }
        }

        $this->info("Deleted {$archivedAssessments->count()} assessments permanently.");
    }
}
