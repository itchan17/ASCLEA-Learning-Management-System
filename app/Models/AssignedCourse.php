<?php

namespace App\Models;

use App\Models\Programs\AssessmentSubmission;
use App\Models\Programs\Grade;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssignedCourse extends Model
{
    use HasUuids;

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The "type" of the auto-incrementing ID (UUID).
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'assigned_course_id';

    protected $fillable = [
        'learning_member_id',
        'course_id',
    ];

    public function member(): BelongsTo
    {
        return $this->belongsTo(LearningMember::class, 'learning_member_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function assessmentSubmissions(): HasMany
    {
        return $this->hasMany(AssessmentSubmission::class, 'submitted_by', 'assigned_course_id');
    }

    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class, 'assigned_course_id');
    }
}
