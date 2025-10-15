<?php

namespace App\Models\CV; 

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DetectedCheating extends Model
{
    use HasUuids, HasFactory;

    protected $table = 'detected_cheatings';
    protected $primaryKey = 'cheating_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'assessment_submission_id',
        'message',
        'timestamp',
    ];

    public $timestamps = false; 

    /**
     * Each detected cheating belongs to an assessment submission.
     */
    public function assessmentSubmission(): BelongsTo
    {
        return $this->belongsTo(AssessmentSubmission::class, 'assessment_submission_id', 'assessment_submission_id');
    }
}
