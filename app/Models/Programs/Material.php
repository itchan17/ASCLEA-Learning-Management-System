<?php

namespace App\Models\Programs;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Material extends Model
{
    use HasUuids, HasFactory, SoftDeletes;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'material_id';

    protected $fillable = [
        'course_id',
        'material_title',
        'material_description',
        'status',
        'created_by',
    ];

    public function materialFiles(): HasMany
    {
        return $this->hasMany(MaterialFile::class, 'material_id');
    }
}
