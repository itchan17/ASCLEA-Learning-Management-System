<?php

namespace App\Models\CV;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CV\DetectedCheating;

class DetectedCheatingFile extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'detected_cheating_files';
    protected $primaryKey = 'detected_cheating_file_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'detected_cheating_id',
        'file_name',
        'file_path',
        'file_type',
        'uploaded_at',
    ];

    public function cheating()
    {
        return $this->belongsTo(DetectedCheating::class, 'detected_cheating_id', 'cheating_id');
    }
}

