<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CreneauSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('creneaux')->insert([
            [
                'nom' => 'Cycle court',
                'duree_minutes' => 15,
            ],
            [
                'nom' => 'Cycle moyen',
                'duree_minutes' => 60,
            ],
            [
                'nom' => 'Cycle long',
                'duree_minutes' => 110,
            ],
        ]);
    }
}