<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    // 📄 Liste des réservations
    public function index()
    {
        return Reservation::with(['user', 'machine', 'creneau'])->get();
    }

    // ➕ Créer une réservation
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'machine_id' => 'required',
            'creneau_id' => 'required',
            'cycle' => 'required',
            'date_reservation' => 'required|date',
        ]);

        $reservation = Reservation::create([
            'user_id' => $request->user_id,
            'machine_id' => $request->machine_id,
            'creneau_id' => $request->creneau_id,
            'cycle' => $request->cycle,
            'statut' => 'en_attente',
            'date_reservation' => $request->date_reservation,
        ]);

        return response()->json($reservation);
    }

    // 🔍 Afficher une réservation
    public function show($id)
    {
        return Reservation::with(['user', 'machine', 'creneau'])->findOrFail($id);
    }

    // ❌ Supprimer une réservation
    public function destroy($id)
    {
        Reservation::destroy($id);

        return response()->json([
            'message' => 'Réservation supprimée avec succès'
        ]);
    }
}