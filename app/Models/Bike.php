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
        'in_stock',
        'active',
        'sku'
    ];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}
