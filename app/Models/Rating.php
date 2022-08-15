<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'comment', 'status', 'rating', 'user_id', 'bike_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function bike(){
        return $this->belongsTo(Bike::class);
    }
}
