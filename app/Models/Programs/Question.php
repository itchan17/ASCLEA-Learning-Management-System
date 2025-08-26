<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'question_id';

    protected $fillable = [
        'quiz_id',
        'question',
        'question_type',
        'question_points',
        'sort_order',
        'is_required',
    ];
}
