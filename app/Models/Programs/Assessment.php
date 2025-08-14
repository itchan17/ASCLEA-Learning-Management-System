<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assessment extends Model
{
    use HasUuids;

    public $incrementing = false;
  
    protected $keyType = 'string';

    protected $primaryKey = 'assessment_id';

    protected $fillable = [
        'assessment_title',
        'assessment_description',
        'due_datetime',
        'total_points',
        'status',
        'created_by',
        'assessment_type_id',
        'course_id', 
    ];

    public function assessmentType(): BelongsTo{
        return $this->belongsTo(AssessmentType::class, 'assessment_type_id');
    }
}
