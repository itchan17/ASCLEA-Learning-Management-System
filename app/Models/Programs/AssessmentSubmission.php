<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssessmentSubmission extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'assessment_submission_id';

    protected $fillable = [
        'assessment_id',
        'submitted_by',
        'submitted_at',
        'end_at',
        'score',
        'feedback',
    ];

    public function quizAnswers(): HasMany
    {
        return $this->hasMany(StudentQuizAnswer::class, 'assessment_submission_id');
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class, 'assessment_id');
    }
}
