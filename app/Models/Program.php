<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Program extends Model
{
    use HasUuids, SoftDeletes;

    protected static function booted(): void
    {
        // Soft delete child courses when the Programm was soft deleted
        static::deleting(function (Program $program) {
            $program->courses()->chunk(100, function ($courses) {
                foreach ($courses as $course) {
                    $course->delete();
                }
            });
        });
    }

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
    protected $primaryKey = 'program_id';

    protected $fillable = [
        'program_name',
        'program_description',
    ];

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'program_id');
    }

    public function learningMembers(): HasMany
    {
        return $this->hasMany(LearningMember::class, 'program_id');
    }
}
