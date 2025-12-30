<?php

namespace App\Models\Backups;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Backup extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'backup_id';

    protected $fillable = [
        'file_path',
        'file_name',
        'file_size',
    ];
}
