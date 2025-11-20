<?php

namespace App\Models\Programs;

use App\Models\AssignedCourse;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Grade extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'grade_id';

    protected $fillable = [
        'course_id',
        'assigned_course_id',
        'status',
        'grade',
        'graded_by',
    ];

    public function course(): BelongsTo
    {
        return  $this->belongsTo(Course::class, 'course_id');
    }

    public function student(): BelongsTo
    {
        return  $this->belongsTo(AssignedCourse::class, 'assigned_course_id');
    }

    public function gradedBy(): BelongsTo
    {
        return  $this->belongsTo(User::class, 'graded_by', 'user_id');
    }
}
