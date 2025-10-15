<?php

namespace App\Models\PaymentHistory;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;


class Payment extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $primaryKey = 'payment_id';

    protected $fillable = [
        'user_id',
        'payment_method',
        'transaction_id',
        'receipt_date',
        'payment_amount',
    ];

    /**
     * payment belongs to a user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    /**
     * payment also belongs to a student 
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'user_id', 'user_id');
    }

    public function files()
    {
        return $this->hasMany(PaymentFile::class, 'payment_id', 'payment_id')->withTrashed();
    }

}
