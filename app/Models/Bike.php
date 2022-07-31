<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bike extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'idn',
        'category_id',
        'city_id',
        'description',
        'price',
        'active',
    ];


    public function category()
    {
        return $this->belongsTo(Category::class,'category_id');
    }

    public function city()
    {
        return $this->hasOne(City::class, 'city_id');
    }
}
