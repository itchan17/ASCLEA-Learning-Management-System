<?php

namespace App\Services\Programs;

use App\Models\Programs\Assessment;
use App\Models\Programs\Material;
use App\Models\Programs\Section;
use App\Models\User;

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

    public function getSectionList(User $user, string  $courseId, string $userRole)
    {
        $assignedCourseId = $this->getAssignedCourseId($user, $courseId);

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
                'items' => function ($query) {
                    $query->orderBy('order', 'asc');
                },
            ])
            ->where(function ($query) use ($user) {
                // Display section added by the user or section that was publsiehd
                $query->where('created_by', $user->user_id)
                    ->orWhere('status', 'published');
            })
            ->withTrashed()
            ->where(function ($query) use ($user) {
                // Display not deleted sections or if deleted the user  must be the owmner
                $query->whereNull('deleted_at')
                    ->orWhere('created_by', $user->user_id);
            })
            ->orderBy('created_at', $userRole === 'admin' ? 'desc' : 'asc')
            ->orderBy('section_id', 'desc')
            ->paginate(5)
            ->through(function ($section) use ($assignedCourseId, $userRole) {

                // Checking if section is lock is only for students
                if ($userRole === 'student') {
                    return $this->checkIsSectionLocked($section, $assignedCourseId);
                }

                return $section;
            });

        return $sectionList;
    }

    // For locking tthe whole section
    public function checkIsSectionLocked(Section $section, string $assignedCourseId)
    {
        $previousSection = Section::where('course_id', $section->course_id)
            ->where(function ($q) use ($section) {
                $q->where('created_at', '<', $section->created_at)
                    ->orWhere(function ($q2) use ($section) {
                        $q2->where('created_at', '=', $section->created_at)
                            ->where('section_id', '<', $section->section_id);
                    });
            })
            ->where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->orderBy('section_id', 'desc')
            ->first();


        // If  null it means the section is the first
        // Else we have to check the if the prrevious section was completeted
        if (is_null($previousSection)) {
            $section->is_locked = false;

            $this->checkIsSectionItemLocked($section->items, $assignedCourseId);
        } else {

            $itemsCount = $previousSection->items()->count();

            $isLocked = $itemsCount > 0 ? $previousSection->items()
                ->whereHas('studentProgress', function ($query) use ($assignedCourseId) {
                    $query->where('assigned_course_id', $assignedCourseId);
                })
                ->count() !== $itemsCount : true;

            $section->is_locked = $isLocked;

            if (!$isLocked) {
                $this->checkIsSectionItemLocked($section->items, $assignedCourseId);
            }
        }

        return $section;
    }

    // For locking section item
    public function checkIsSectionItemLocked($sectionItems, string $assignedCourseId)
    {
        foreach ($sectionItems as $index => $sectionItem) {
            if ($index === 0) {
                // The first item in the section should always be unlocked
                $sectionItem->is_item_locked = false;
            } else {
                $prevSectionItem = $sectionItems[$index - 1];

                // Lock this item if the previous one has not been completed
                $sectionItem->is_item_locked = !$prevSectionItem->studentProgress()
                    ->where('assigned_course_id', $assignedCourseId)
                    ->exists();
            }
        }
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

    public function getAssignedCourseId(User $user, string $courseId,)
    {
        // Get the assigned course id of the user
        // It will be used for getting record in the assessmnt submisisons
        $assignedCourseId = $user
            ->programs()
            ->with(['courses' => function ($query) use ($courseId) {
                $query->where('course_id', $courseId);
            }])
            ->get()
            ->pluck('courses.*.assigned_course_id')
            ->flatten()
            ->first();

        return $assignedCourseId;
    }
}
