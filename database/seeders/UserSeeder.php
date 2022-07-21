<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'adminUser',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin12345'),
        ]);

        $admin->assignRole('admin');

        $user = User::create([
            'name' => 'testingUser',
            'email' => 'user@user.com',
            'password' => Hash::make('user12345'),
        ]);

        $user->assignRole('user');
    }
}
