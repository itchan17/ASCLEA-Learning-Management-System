<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class AssessmentFile extends Model
{
    use HasUuids;

    public $incrementing = false;
  
    protected $keyType = 'string';

    protected $primaryKey = 'assessment_file_id';

    protected $fillable = [
        'assessment_id',
        'file_path',
        'file_name',
        'file_type',
    ];
}
