<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
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
    protected $primaryKey = 'role_id';

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'role_id');
    }
}
