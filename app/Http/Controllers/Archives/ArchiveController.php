<?php

namespace App\Http\Controllers\Archives;

use App\Http\Controllers\Controller;
use App\Services\Archives\ArchiveService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArchiveController extends Controller
{
    protected ArchiveService $archiveService;

    public function __construct(ArchiveService $archiveService)
    {
        $this->archiveService = $archiveService;
    }
    public function showArchives()
    {
        return Inertia::render('Archives/Archives', [
            'archivedCourses' => fn() => $this->archiveService->getArchivedCourses(),
            'archivedStaff' => fn() => $this->archiveService->getArchivedStaff(),
            'archivedStudents' => fn() => $this->archiveService->getArchivedStudents()
        ]);
    }
}
