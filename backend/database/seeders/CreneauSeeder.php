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
                'date' => '2026-05-27',
                'heureDebut' => '08:00:00',
                'heureFin' => '09:00:00',
                'statut' => 'disponible',
                'machine_id' => 1,
            ],

            [
                'date' => '2026-05-27',
                'heureDebut' => '09:00:00',
                'heureFin' => '10:00:00',
                'statut' => 'disponible',
                'machine_id' => 1,
            ],

            [
                'date' => '2026-05-27',
                'heureDebut' => '10:00:00',
                'heureFin' => '11:00:00',
                'statut' => 'reserve',
                'machine_id' => 2,
            ],

        ]);
    }
}