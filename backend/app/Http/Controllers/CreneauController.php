<?php
namespace App\Http\Controllers;

use App\Models\Creneau;
use App\Models\Reservation;
use Illuminate\Http\Request;

class CreneauController extends Controller
{
    public function index()
    {
        return Creneau::with('machine')->get();
    }

    public function disponibles()
    {
        return Creneau::where('statut', 'disponible')
                      ->with('machine')
                      ->get();
    }

    public function generer(Request $request)
    {
        $date        = $request->date;         // ex: '2026-06-10'
        $machineType = $request->machine_type; // 'lave-linge' ou 'seche-linge'
        $duree       = (int) $request->duree;  // 30, 60, 90 ou 120 minutes

        if (!$date || !$machineType || !$duree) {
            return response()->json(['message' => 'Paramètres manquants'], 400);
        }

        // Horaires selon le jour de la semaine
        $dayOfWeek = (int) date('N', strtotime($date)); // 1=Lun ... 7=Dim

        if ($dayOfWeek >= 1 && $dayOfWeek <= 5) {
            $startMinutes = 14 * 60; // 14h00
            $endMinutes   = 20 * 60; // 20h00
        } else {
            $startMinutes = 10 * 60; // 10h00
            $endMinutes   = 18 * 60; // 18h00
        }

        // Machines disponibles (pas en panne)
        $machines = \App\Models\Machine::where('type', $machineType)
                                        ->where('statut', '!=', 'en_panne')
                                        ->get();

        if ($machines->isEmpty()) {
            return response()->json([]);
        }

        // Générer les créneaux horaires
        $result  = [];
        $current = $startMinutes;

        while ($current + $duree <= $endMinutes) {

            $heureDebut = sprintf('%02d:%02d:00', intdiv($current, 60), $current % 60);
            $heureFin   = sprintf('%02d:%02d:00', intdiv($current + $duree, 60), ($current + $duree) % 60);

            $machineCreneaux = [];

            foreach ($machines as $machine) {

                // Créer le créneau en DB s'il n'existe pas encore
                $creneau = Creneau::firstOrCreate(
                    [
                        'machine_id' => $machine->id,
                        'date'       => $date,
                        'heureDebut' => $heureDebut,
                        'heureFin'   => $heureFin,
                    ],
                    [
                        'statut' => 'disponible',
                    ]
                );

                // Vérifier si ce créneau est déjà réservé
                $isOccupied = Reservation::where('machine_id', $machine->id)
    ->where('statut', '!=', 'annulee')
    ->whereHas('creneau', function ($q) use ($date, $heureDebut, $heureFin) {
        $q->where('date', $date)
          ->where('heureDebut', '<', $heureFin)   // commence avant la fin
          ->where('heureFin', '>', $heureDebut);  // termine après le début
    })
    ->exists();

                $machineCreneaux[] = [
                    'creneau_id'     => $creneau->id,
                    'machine_id'     => $machine->id,
                    'machine_numero' => $machine->numero,
                    'status'         => $isOccupied ? 'occupied' : 'free',
                ];
            }

            // Le créneau est libre si au moins une machine est disponible
            $freeMachine = collect($machineCreneaux)->firstWhere('status', 'free');

            $result[] = [
                'label'      => substr($heureDebut, 0, 5) . ' - ' . substr($heureFin, 0, 5),
                'heureDebut' => substr($heureDebut, 0, 5),
                'heureFin'   => substr($heureFin, 0, 5),
                'status'     => $freeMachine ? 'free' : 'occupied',
                'creneau_id' => $freeMachine ? $freeMachine['creneau_id'] : $machineCreneaux[0]['creneau_id'],
                'machine_id' => $freeMachine ? $freeMachine['machine_id'] : $machineCreneaux[0]['machine_id'],
            ];

            $current += $duree;
        }

        return response()->json($result);
    }
}