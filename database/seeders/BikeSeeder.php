<?php

namespace Database\Seeders;

use App\Models\Bike;
use Illuminate\Database\Seeder;

class BikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Bike::create([
            'category_id' => 1,
            'city_id' => 1,
            'title' => 'BMX',
            'description' => 'BMX',
            'idn' => 'LT1874562311',
            'price' => 100,
            'in_stock' => 5,
            'active' => 1,
        ]);
        Bike::create([
            'category_id' => 3,
            'city_id' => 2,
            'title' => 'MTB',
            'description' => 'MTB',
            'idn' => 'LT1874562311',
            'price' => 150,
            'in_stock' => 3,
            'active' => 1,
        ]);
    }
}
