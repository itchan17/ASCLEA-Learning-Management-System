<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuestionOption extends Model
{
    use HasUuids;

    protected static function booted(): void
    {
        // Update the option's order whenever an option was deleted
        static::deleted(function (QuestionOption $option) {
            $options = QuestionOption::where('question_id', $option->question_id)->orderBy('option_order')->get();

            foreach ($options as $index => $option) {
                $option->update(['option_order' => $index + 1]);
            }
        });
    }


    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'question_option_id';

    protected $fillable = [
        'question_id',
        'option_text',
        'option_order',
        'is_correct'
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
