<?php

namespace App\Services\Archives;

use App\Models\Administration\Staff;
use App\Models\Course;
use Exception;
use Illuminate\Support\Facades\Http;

class ArchiveService
{
    public function getArchivedCourses()
    {
        return Course::onlyTrashed()
            ->with('program')
            ->orderBy('deleted_at', 'desc')
            ->get();
    }

    public function getArchivedStaff()
    {
        return Staff::onlyTrashed()
            ->with('user:user_id,first_name,last_name,profile_image')
            ->orderBy('deleted_at', 'desc')
            ->paginate(10);
    }
}
