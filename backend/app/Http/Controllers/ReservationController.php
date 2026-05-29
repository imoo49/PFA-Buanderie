<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ReservationController extends Controller
{
    // 📄 Liste des réservations
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {

            return Reservation::with([
                'user',
                'machine',
                'creneau'
            ])->get();
        }

        return Reservation::with([
            'user',
            'machine',
            'creneau'
        ])
        ->where('user_id', $user->id)
        ->get();
    }

    // ➕ Créer réservation
public function store(Request $request)
{
    $request->validate([
        'machine_id'      => 'required|exists:machines,id',
        'creneau_id'      => 'required|exists:creneaux,id',
        'dateReservation' => 'required|date',
        'dureeCycle'      => 'required|integer',
    ]);

    $user    = $request->user();
    $creneau = \App\Models\Creneau::findOrFail($request->creneau_id);
    $machine = \App\Models\Machine::findOrFail($request->machine_id);  // ← AJOUT

    // 🔒 Vérifier que la date n'est pas dans le passé
    $today = Carbon::today()->toDateString();
    if ($request->dateReservation < $today) {
        return response()->json([
            'message' => 'Impossible de réserver une date passée'
        ], 422);
    }

    // 🔒 Si aujourd'hui, vérifier que le créneau n'est pas déjà passé
    if ($request->dateReservation === $today) {
        $heureDebut = Carbon::createFromFormat('H:i:s', $creneau->heureDebut);
        if ($heureDebut->isPast()) {
            return response()->json([
                'message' => 'Ce créneau est déjà passé, veuillez choisir un créneau futur'
            ], 422);
        }
    }

    // 🔒 Vérifier chevauchement horaire sur cette machine ce jour-là
    $chevauche = Reservation::where('machine_id', $request->machine_id)
        ->where('statut', '!=', 'annulee')
        ->whereHas('creneau', function ($q) use ($creneau) {
            $q->where('date', $creneau->date)
              ->where('heureDebut', '<', $creneau->heureFin)
              ->where('heureFin', '>', $creneau->heureDebut);
        })
        ->exists();

    if ($chevauche) {
        return response()->json([
            'message' => 'Ce créneau est déjà réservé ou chevauche une réservation existante'
        ], 409);
    }

    // 🔒 FIX : une seule réservation par TYPE de machine par jour
    $dejaReserve = Reservation::where('user_id', $user->id)
        ->where('dateReservation', $request->dateReservation)
        ->where('statut', '!=', 'annulee')
        ->whereHas('machine', function ($q) use ($machine) {
            $q->where('type', $machine->type);
        })
        ->exists();

    if ($dejaReserve) {
        return response()->json([
            'message' => 'Vous avez déjà une réservation pour ce type de machine ce jour'
        ], 409);
    }

    // Création de la réservation
    $reservation = Reservation::create([
        'user_id'         => $user->id,
        'machine_id'      => $request->machine_id,
        'creneau_id'      => $request->creneau_id,
        'dateReservation' => $request->dateReservation,
        'dureeCycle'      => $request->dureeCycle,
        'statut'          => 'en_attente',
    ]);

    return response()->json([
        'message'     => 'Réservation créée avec succès',
        'reservation' => $reservation->load(['machine', 'creneau'])
    ], 201);
}

    // 🔍 Afficher réservation
    public function show(Request $request, $id)
    {
        $user = $request->user();

        $reservation = Reservation::with([
            'user',
            'machine',
            'creneau'
        ])->findOrFail($id);

        if (
            $user->role !== 'admin'
            &&
            $reservation->user_id !== $user->id
        ) {
            return response()->json([
                'message' => 'Accès refusé'
            ], 403);
        }

        return response()->json($reservation);
    }

    // ❌ Supprimer / annuler réservation (admin)
    public function destroy(Request $request, $id)
    {
        $user = $request->user();

        $reservation = Reservation::findOrFail($id);

        if (
            $user->role !== 'admin'
            &&
            $reservation->user_id !== $user->id
        ) {
            return response()->json([
                'message' => 'Accès refusé'
            ], 403);
        }

        $reservation->update([
            'statut' => 'annulee'
        ]);

        return response()->json([
            'message' => 'Réservation annulée avec succès'
        ]);
    }

    // 🚫 Annuler sa propre réservation (étudiant)
    public function annuler(Request $request, $id)
    {
        $reservation = Reservation::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        if (!in_array($reservation->statut, ['en_attente', 'confirme'])) {
            return response()->json([
                'message' => 'Cette réservation ne peut pas être annulée'
            ], 422);
        }

        $reservation->update(['statut' => 'annulee']);

        return response()->json(['message' => 'Réservation annulée avec succès']);
    }
}