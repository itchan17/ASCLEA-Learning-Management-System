<?php

namespace App\Models\Admission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Models\Student; 

class AdmissionFile extends Model
{
    use HasFactory, SoftDeletes;
    public $timestamps = false;

    protected $table = 'admission_files';
    protected $primaryKey = 'admission_file_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'admission_file_id',
        'student_id',
        'file_name',
        'file_path',
        'file_type',
        'uploaded_at',
        'deleted_at',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    /**
     * Relationship: belongs to student
     */
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }

    public function resolveRouteBinding($value, $field = null)
    {
        return $this->withTrashed()
                    ->where($field ?? $this->getRouteKeyName(), $value)
                    ->first();
    }

}
