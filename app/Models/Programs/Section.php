<?php

namespace App\Models\Programs;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Section extends Model
{
    use HasUuids, SoftDeletes;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'section_id';

    protected $fillable = [
        'course_id',
        'section_title',
        'status',
        'created_by',
    ];

    public function course(): BelongsTo
    {
        return  $this->belongsTo(Course::class, 'course_id');
    }

    public function author(): BelongsTo
    {
        return  $this->belongsTo(User::class, 'created_by', 'user_id');
    }

    public function sectionItem(): HasMany
    {
        return  $this->hasMany(SectionItem::class, 'section_id');
    }
}
