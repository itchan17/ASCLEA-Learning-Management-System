<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssessmentType extends Model
{
    public $incrementing = false;
  
    protected $keyType = 'string';

    protected $primaryKey = 'assessment_type_id';

     protected $fillable = [
        'assessment_type',
    ];

    public function assessments(): HasMany{
        return $this->hasMany(Assessment::class, 'assessment_type_id');
    }
}
