<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'title' => 'Road',
            'active' => 1,
        ]);

        Category::create([
            'title' => 'Mountain',
            'active' => 1,
        ]);

        Category::create([
            'title' => 'Cyclocross',
            'active' => 1,
        ]);

        Category::create([
            'title' => 'Folding',
            'active' => 1,
        ]);

        Category::create([
            'title' => 'Touring',
            'active' => 1,
        ]);

        Category::create([
            'title' => 'Womens',
            'active' => 1,
        ]);

        Category::create([
            'title' => 'Electric',
            'active' => 0,
        ]);
    }
}
