<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MachineSeeder extends Seeder
{
    public function run(): void
    {
        // 7 machines de lavage
        for ($i = 1; $i <= 7; $i++) {
            DB::table('machines')->insert([
                'nom' => 'Machine Lavage ' . $i,
                'type' => 'lavage',
                'etat' => 'disponible',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 2 sèche-linges
        for ($i = 1; $i <= 2; $i++) {
            DB::table('machines')->insert([
                'nom' => 'Sèche-linge ' . $i,
                'type' => 'sechage',
                'etat' => 'disponible',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}