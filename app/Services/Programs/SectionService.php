<?php

namespace App\Services\Programs;

use App\Models\Programs\Section;

class SectionService
{
    public function getSectionCompleteDetails(Section $section)
    {
        return $section->load([
            'author:user_id,first_name,last_name',
        ]);
    }

    public function getSectionList(string $userId, string  $courseId)
    {
        $sectionList = Section::where('course_id', $courseId)
            ->with(['author' => function ($query) {
                $query->select('user_id', 'first_name', 'last_name');
            }])
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
}
