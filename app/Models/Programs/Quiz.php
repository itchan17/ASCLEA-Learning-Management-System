<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'quiz_id';

    protected $fillable = [
        'assessment_id',
        'quiz_title',
        'quiz_description',
        'quiz_total_points',
        'duration',
        'created_by',
        'cheating_mitigation',
        'show_answers_after',
    ];
}
