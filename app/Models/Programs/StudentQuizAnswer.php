<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class StudentQuizAnswer extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'student_quiz_answer_id';

    protected $fillable = [
        'assessment_submission_id',
        'question_id',
        'answer_id',
        'answer_text',
        'is_correct',
        'feedback',
    ];
}
