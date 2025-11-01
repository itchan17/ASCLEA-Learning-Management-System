<?php

namespace App\Services\Programs;

use App\Models\Programs\SectionItem;
use App\Models\Programs\StudentProgress;
use Carbon\Carbon;

class StudentProgressService
{
    public function doneUndoneStudentProgress(string $assignedCourseId, SectionItem $sectionItem)
    {
        $progress = StudentProgress::firstOrCreate(
            ['section_item_id' => $sectionItem->section_item_id, 'assigned_course_id' => $assignedCourseId],
            [
                'section_item_id' => $sectionItem->section_item_id,
                'assigned_course_id' => $assignedCourseId,
                'is_done' => true,
                'done_at' => Carbon::now(),
            ]
        );

        // Done and undone the student progress
        if (!$progress->wasRecentlyCreated) {
            $progress->update(
                [
                    'is_done' => !$progress->is_done,
                    'done_at'  => $progress->is_done ?  null : Carbon::now()
                ]
            );
        }
    }
}
