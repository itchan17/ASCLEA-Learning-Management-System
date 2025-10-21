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
}
