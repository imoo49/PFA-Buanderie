<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MachineSeeder extends Seeder
{
    public function run(): void
    {
        // 7 lave-linges
        for ($i = 1; $i <= 7; $i++) {
            DB::table('machines')->insert([
                'type' => 'lave-linge',
                'numero' => 'LL-' . str_pad($i, 2, '0', STR_PAD_LEFT), // LL-01, LL-02, etc.
                'capacite' => rand(7, 10), // Capacité aléatoire entre 7 et 10 kg
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 2 sèche-linges
        for ($i = 1; $i <= 2; $i++) {
            DB::table('machines')->insert([
                'type' => 'seche-linge',
                'numero' => 'SL-' . str_pad($i, 2, '0', STR_PAD_LEFT), // SL-01, SL-02
                'capacite' => rand(6, 8),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}