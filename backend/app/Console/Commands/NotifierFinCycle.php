<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reservation;
use App\Notifications\FinCycleImminente;
use Carbon\Carbon;

class NotifierFinCycle extends Command
{
    protected $signature   = 'notifier:fin-cycle';
    protected $description = 'Notifie les étudiants 15 min avant la fin du cycle';

    public function handle(): void
    {
        $maintenant  = Carbon::now();
        $cible       = $maintenant->copy()->addMinutes(15);

        // Cherche les réservations dont le créneau finit dans ~15 min
        $reservations = Reservation::with(['user', 'machine', 'creneau'])
            ->where('statut', '!=', 'annulee')
            ->whereHas('creneau', function ($q) use ($cible) {
                $q->whereDate('date', $cible->toDateString())
                  ->whereTime('heureFin', '>=', $cible->format('H:i:00'))
                  ->whereTime('heureFin', '<=', $cible->copy()->addMinutes(1)->format('H:i:59'));
            })
            ->get();

        foreach ($reservations as $reservation) {
            $user = $reservation->user;

            // Éviter le doublon : ne pas envoyer si déjà notifié
            $dejaNotifie = $user->notifications()
                ->where('type', 'App\Notifications\FinCycleImminente')
                ->where('created_at', '>=', now()->subMinutes(2))
                ->exists();

            if (!$dejaNotifie) {
                $user->notify(new FinCycleImminente(
                    machineName: "Machine #{$reservation->machine->numero}",
                    heureFin:    $reservation->creneau->heureFin
                ));

                $this->info("Notification envoyée à {$user->email}");
            }
        }
    }
}