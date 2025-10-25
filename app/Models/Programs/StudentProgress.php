<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentProgress extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'student_progress_id';

    protected $fillable = [
        'section_item_id',
        'assigned_course_id',
        'is_done',
        'done_at',
    ];

    protected function casts(): array
    {
        return [
            'is_done' => 'boolean',
        ];
    }

    public function sectionItem(): BelongsTo
    {
        return $this->belongsTo(SectionItem::class, 'section_item_id');
    }
}
