<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Question extends Model
{
    use HasUuids;

    protected static function booted(): void
    {
        // Update the question's order whenever a question was deleted
        static::deleted(function (Question $question) {
            $questions = Question::where('quiz_id', $question->quiz_id)->orderBy('sort_order')->get();

            foreach ($questions as $index => $question) {
                $question->update(['sort_order' => $index + 1]);
            }
        });
    }


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

    protected function casts(): array
    {
        return [
            'is_required' => 'boolean',
        ];
    }

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class, 'quiz_id');
    }


    public function options(): HasMany
    {
        return $this->hasMany(QuestionOption::class, 'question_id');
    }

    public function studentAnswer(): HasOne
    {
        return $this->hasOne(StudentQuizAnswer::class, 'question_id');
    }
}
