<?php

namespace App\Console\Commands;

use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class DeleteOldRejectedStudents extends Command
{
    protected $signature = 'app:delete-old-rejected-students';
    protected $description = 'Delete students rejected for 30+ days, including files';

    public function handle()
    {
        $threshold = Carbon::now()->subDays(30);

        // Students who have been rejected for 30+ days and NOT soft-deleted
        $students = Student::whereIn('admission_status', ['Rejected', 'Not Submitted'])
        ->where('updated_at', '<=', $threshold)
        ->with(['admissionFiles' => function ($q) {
            $q->withTrashed();
        }])
        ->get();

        
        $this->info("Found {$students->count()} rejected students.");


        if ($students->isEmpty()) {
            $this->info("No rejected students to delete.");
            return;
        }

        foreach ($students as $student) {

            $this->info("Deleting student: {$student->student_id}");

            // Delete all admission files 
            foreach ($student->admissionFiles as $file) {
                if ($file->file_path && Storage::disk('public')->exists($file->file_path)) {
                    Storage::disk('public')->delete($file->file_path);
                }

                $file->forceDelete();
            }

            // Now delete the student
            $student->forceDelete();

            if ($student->user) {
                $this->info("Deleting user: {$student->user->id}");
                $student->user->forceDelete();
            }

        }

        $this->info("Deleted {$students->count()} rejected students.");
    }
}
