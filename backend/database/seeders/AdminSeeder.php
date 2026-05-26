<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            'name'       => 'Admin',
            'prenom'     => 'Buanderie',
            'email'      => 'admin@ensias.com',
            'password'   => Hash::make('admin123'),
            'role'       => 'admin',
            'telephone'  => '0600000000',
            'numChambre' => 'ADMIN',
            'genre'      => 'Homme',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}