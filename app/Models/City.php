<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'city', 'address', 'active',
    ];
    

    public function bikes()
    {
        return $this->hasMany(Bike::class, 'city_id');
    }
}
