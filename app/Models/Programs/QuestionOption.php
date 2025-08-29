<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuestionOption extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'question_option_id';

    protected $fillable = [
        'question_id',
        'option_text',
        'is_correct'
    ];


    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class, 'question_id');
    }
}
