<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CvOption extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'cv_option_id';

    protected $fillable = [
        'quiz_id',
        'option',
    ];

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Quiz::class, 'quiz_id');
    }
}
