<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Machine;

class MachineController extends Controller
{
    // AFFICHER TOUTES LES MACHINES
    public function index(Request $request)
    {
        $query = Machine::query();

        // filtre par type
        if ($request->type) {
            $query->where('type', $request->type);
        }

        return $query->get();
    }

    // AFFICHER UNE MACHINE
    public function show($id)
    {
        return Machine::findOrFail($id);
    }

    // AJOUTER UNE MACHINE
    public function store(Request $request)
    {
        $request->validate([
            'numero' => 'required',
            'type' => 'required',
            'capacite' => 'required|integer'
        ]);

        $machine = Machine::create([
            'numero' => $request->numero,
            'type' => $request->type,
            'capacite' => $request->capacite,
            'statut' => 'disponible'
        ]);

        return response()->json($machine, 201);
    }

    // SUPPRIMER UNE MACHINE
    public function destroy($id)
    {
        $machine = Machine::findOrFail($id);

        $machine->delete();

        return response()->json([
            'message' => 'Machine supprimée'
        ]);
    }

    // CHANGER ETAT PANNE
    public function togglePanne($id)
    {
        $machine = Machine::findOrFail($id);

        $machine->statut =
            $machine->statut === 'en_panne'
            ? 'disponible'
            : 'en_panne';

        $machine->save();

        return response()->json($machine);
    }
}