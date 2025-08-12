<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LearningMember extends Model
{
    use HasUuids;

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
    protected $primaryKey = 'learning_member_id';

    protected $fillable = [
        'user_id',
        'program_id',
    ];

    public function program(): BelongsTo 
    {
        return $this->belongsTo(Program::class, 'program_id');
    }

    public function user(): BelongsTo 
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
