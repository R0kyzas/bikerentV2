<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'active',
    ];

    public function bikes()
    {
        return $this->hasMany(Bike::class, 'category_id');
    }
}
