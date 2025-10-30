<?php

namespace App\Services\Programs;

use App\Models\Programs\Assessment;
use App\Models\Programs\Material;
use App\Models\Programs\Section;

class SectionService
{
    public function getSectionCompleteDetails(Section $section)
    {
        return $section->load(
            [
                'author:user_id,first_name,last_name',
                'items.item' => function ($morphTo) {
                    $morphTo->morphWith([
                        // For Assessments
                        Assessment::class => [
                            'assessmentType',
                            'author:user_id,first_name,last_name',
                            'quiz:assessment_id,quiz_id,quiz_title',
                            'files:assessment_id,assessment_file_id,file_name,file_path',
                        ],

                        // For Materials
                        Material::class => [
                            'author:user_id,first_name,last_name',
                            'materialFiles:material_id,material_file_id,file_name,file_path',
                        ],
                    ]);
                },
            ]
        );
    }

    public function getSectionList(string $userId, string  $courseId)
    {
        $sectionList = Section::where('course_id', $courseId)
            ->with([
                'author:user_id,first_name,last_name',
                'items.item' => function ($morphTo) {
                    $morphTo->morphWith([
                        // For the Assessment type
                        Assessment::class => [
                            'assessmentType',
                            'author:user_id,first_name,last_name',
                            'quiz:assessment_id,quiz_id,quiz_title',
                            'files:assessment_id,assessment_file_id,file_name,file_path',
                        ],

                        // For the Material type
                        Material::class => [
                            'author:user_id,first_name,last_name',
                            'materialFiles:material_id,material_file_id,file_name,file_path',
                        ],
                    ]);
                },
            ])
            ->where(function ($query) use ($userId) {
                // Display section added by the user or section that was publsiehd
                $query->where('created_by', $userId)
                    ->orWhere('status', 'published');
            })
            ->withTrashed()
            ->where(function ($query) use ($userId) {
                // Display not deleted sections or if deleted the user  must be the owmner
                $query->whereNull('deleted_at')
                    ->orWhere('created_by', $userId);
            })
            ->orderBy('created_at', 'asc')
            ->orderBy('section_id', 'desc')
            ->paginate(5);

        return $sectionList;
    }

    public function archiveSection(Section $section)
    {
        $section->delete(); // Soft delete the section

        return  $this->getSectionCompleteDetails($section);
    }

    public function restoreSection(string $sectionId)
    {
        // Get the instace of model since model binding
        // is not working for soft deleted data
        $section = Section::withTrashed()->findOrFail($sectionId);

        $section->restore();

        return  $this->getSectionCompleteDetails($section);
    }
}
