<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Models\Admission\AdmissionFile;

class Student extends Model
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
    protected $primaryKey = 'student_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'enrollment_status',
        'admission_status',
        'admission_message',
        'archived_by',
        'payment',
    ];

    protected $dates = ['deleted_at', 'approved_at', 'created_at', 'updated_at'];

    protected $casts = [
        'approved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withTrashed();
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'user_id', 'user_id');
    }

    public function learningMember()
    {
        return $this->hasOne(LearningMember::class, 'user_id', 'user_id');
    }

    public function admissionFiles(): HasMany
    {
        return $this->hasMany(AdmissionFile::class, 'student_id', 'student_id')->withTrashed();
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function archivedBy()
    {
        return $this->belongsTo(User::class, 'archived_by', 'user_id')->withTrashed();
    }
}
