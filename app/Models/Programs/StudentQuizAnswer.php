<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    protected function casts(): array
    {
        return [
            'is_correct' => 'boolean',
        ];
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class, 'question_id');
    }
}
