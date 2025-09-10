<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

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
        'score',
        'feedback',
    ];
}
