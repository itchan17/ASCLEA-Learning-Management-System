<?php

namespace App\Models\Administration;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staff extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

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
    protected $primaryKey = 'staff_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'status',
        'created_by',
    ];

    protected $dates = ['deleted_at'];

    /**
     * Relationship to the User model.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id', 'user_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'created_by', 'user_id');
    }

    public function learningMembers(): HasMany
    {
        return $this->hasMany(LearningMember::class, 'user_id', 'user_id');
    }

    public function assignedCourses()
    {
        return $this->hasManyThrough(
            \App\Models\AssignedCourse::class,  // final model
            \App\Models\LearningMember::class,  // intermediate model
            'user_id',              // learning_members.user_id
            'learning_member_id',   // assigned_courses.learning_member_id
            'user_id',              // staff.user_id
            'learning_member_id'    // learning_members.learning_member_id
        )->with('course.program'); // eager load course and program
    }


}
