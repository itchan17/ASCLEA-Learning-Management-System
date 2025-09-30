<?php

namespace App\Models\PaymentHistory;

use App\Models\User;
use App\Models\PaymentHistory\Payment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\SoftDeletes;


class PaymentFile extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'payment_files';
    protected $primaryKey = 'payment_file_id';
    public $incrementing = false;   // uuid
    protected $keyType = 'string';  // uuid stored as string

    protected $fillable = [
        'payment_file_id',   
        'payment_id',
        'file_name',
        'file_path',
        'file_type',
        'uploaded_by',
        'uploaded_at',
        'deleted_at',
    ];

    protected $dates = ['uploaded_at', 'deleted_at'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public $timestamps = false; // keep only uploaded_at

    // Relationships
    public function payment()
    {
        return $this->belongsTo(Payment::class, 'payment_id', 'payment_id')->withTrashed();
    }
    
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by', 'user_id');
    }
}
