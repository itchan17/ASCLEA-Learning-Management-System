<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Program;
use App\Services\Programs\GradeService;
use Illuminate\Http\Request;

class GradeController extends Controller
{
    protected GradeService $gradeService;

    public function __construct(GradeService $gradeService)
    {
        $this->gradeService = $gradeService;
    }

    public function getStudents(Program $program, Course $course) {}
}
