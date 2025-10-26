<?php

namespace App\Models\Programs;

use App\Models\AssignedCourse;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\CV\DetectedCheating; 


class AssessmentSubmission extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'assessment_submission_id';

    protected $fillable = [
        'assessment_id',
        'submitted_by',
        'submission_status',
        'submitted_at',
        'end_at',
        'score',
        'feedback',
    ];

    public function quizAnswers(): HasMany
    {
        return $this->hasMany(StudentQuizAnswer::class, 'assessment_submission_id');
    }

    public function detectedCheatings(): HasMany
    {
        return $this->hasMany(DetectedCheating::class, 'assessment_submission_id');
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class, 'assessment_id');
    }

    public function submittedBy(): BelongsTo
    {
        return $this->belongsTo(AssignedCourse::class, 'submitted_by', 'assigned_course_id');
    }

    public function activityFiles(): HasMany
    {
        return $this->hasMany(ActivityFile::class, 'assessment_submission_id');
    }
}
