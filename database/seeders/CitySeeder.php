<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        City::create([
            'city' => 'Šiauliai',
            'address' => 'Vilniaus g. 10',
        ]);

        City::create([
            'city' => 'Vilnius',
            'address' => 'Vytauto g. 35a',
        ]);

        City::create([
            'city' => 'Kaunas',
            'address' => 'Kęstučio g. 24',
        ]);

        City::create([
            'city' => 'Klaipėda',
            'address' => 'Varpo g. 44',
        ]);
    }
}
