<?php

namespace App\Models;

use App\Models\Programs\Assessment;
use App\Models\Programs\Grade;
use App\Models\Programs\Material;
use App\Models\Programs\Section;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasUuids, SoftDeletes;

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The "type" of the auto-incrementing ID (UUID).
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'course_id';

    protected $fillable = [
        'course_code',
        'course_name',
        'course_description',
        'course_day',
        'start_time',
        'end_time',
        'program_id',
    ];

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class, 'program_id');
    }

    public function assignedTo(): HasMany
    {
        return $this->hasMany(AssignedCourse::class, 'course_id');
    }

    public function assessments(): HasMany
    {
        return  $this->hasMany(Assessment::class, 'course_id');
    }

    public function materials(): HasMany
    {
        return  $this->hasMany(Material::class, 'course_id');
    }

    public function sections(): HasMany
    {
        return  $this->hasMany(Section::class, 'course_id');
    }

    public function grades(): HasMany
    {
        return  $this->hasMany(Grade::class, 'course_id');
    }
}
