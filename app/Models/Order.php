<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public const STATUS_PENDING = 'Pending';
    public const STATUS_ACCEPTED = 'Accepted';
    public const STATUS_COMPLETED = 'Completed';
    public const STATUS_CANCELED = 'Canceled';
    
    use HasFactory;

    protected $fillable = [
        'total_price', 'order_nr', 'user_id',
        'status', 'cancel_reason',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function order_items()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    public function bike()
    {
        return $this->belongsTo(Bike::class);
    }
}
