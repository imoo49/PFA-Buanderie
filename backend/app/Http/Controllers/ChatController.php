<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $message = strtolower($request->message);

        // HORAIRES
        if (
            str_contains($message, 'horaire') ||
            str_contains($message, 'ouvert') ||
            str_contains($message, 'heure')
        ) {
            return response()->json([
                'reply' => "Du lundi au vendredi : de 14h à 20h\nSamedi et dimanche : de 10h à 18h"
            ]);
        }

        // RESERVATION
        if (
            str_contains($message, 'réserver') ||
            str_contains($message, 'reservation') ||
            str_contains($message, 'reserver')
        ) {
            return response()->json([
                'reply' => "Pour réserver une machine, allez dans la page Machines puis cliquez sur Réserver."
            ]);
        }

        // PANNES
        if (
            str_contains($message, 'panne') ||
            str_contains($message, 'probleme') ||
            str_contains($message, 'ne marche pas')
        ) {
            return response()->json([
                'reply' => "Le problème a été signalé à l'administrateur."
            ]);
        }

        // MACHINES
        if (str_contains($message, 'machine')) {
            return response()->json([
                'reply' => "Les machines disponibles apparaissent dans la page Machines."
            ]);
        }

        // REGLES
        if (
            str_contains($message, 'règle') ||
            str_contains($message, 'regle')
        ) {
            return response()->json([
                'reply' => "Merci de récupérer votre linge rapidement après le lavage."
            ]);
        }

        // AIDE
        if (str_contains($message, 'aide')) {
            return response()->json([
                'reply' => "Je peux vous aider pour les horaires, réservations, règles, machines et météo."
            ]);
        }

        // MÉTÉO + LESSIVE
        if (
            str_contains($message, 'meilleur moment') ||
            str_contains($message, 'lessive') ||
            str_contains($message, 'météo') ||
            str_contains($message, 'meteo') ||
            str_contains($message, 'humidité') ||
            str_contains($message, 'humidite') ||
            str_contains($message, 'séchage') ||
            str_contains($message, 'sechage')
        ) {
            // 1. Récupérer la météo réelle
            $weatherResponse = Http::timeout(10)->get(
                'https://api.openweathermap.org/data/2.5/weather',
                [
                    'q'     => 'Beni Mellal',
                    'appid' => env('WEATHER_API_KEY'),
                    'units' => 'metric',
                    'lang'  => 'fr'
                ]
            );

            if (!$weatherResponse->successful()) {
                return response()->json([
                    'reply' => "Désolé, je n'arrive pas à récupérer la météo pour le moment."
                ]);
            }

            $weather     = $weatherResponse->json();
            $humidity    = $weather['main']['humidity'];
            $temp        = $weather['main']['temp'];
            $description = $weather['weather'][0]['description'];

            // 2. Conseil basé sur les valeurs réelles
            if ($humidity > 70) {
                $conseil = "⚠️ Humidité élevée ({$humidity}%) — le linge séchera lentement, pas idéal.";
            } elseif ($temp < 10) {
                $conseil = "❄️ Température basse ({$temp}°C) — séchage difficile dehors.";
            } elseif ($humidity >= 50 && $humidity <= 70) {
                $conseil = "🌤️ Conditions moyennes ({$temp}°C, {$humidity}% d'humidité) — séchage possible mais pas optimal.";
            } else {
                $conseil = "✅ Conditions favorables ({$temp}°C, {$humidity}% d'humidité) — bon moment pour faire la lessive !";
            }

            return response()->json([
                'reply' => "Météo actuelle à Beni Mellal : {$description}.\n{$conseil}"
            ]);
        }

        // PAR DÉFAUT
        return response()->json([
            'reply' => "Désolé, je n'ai pas compris votre question. Tapez 'aide' pour voir ce que je peux faire."
        ]);
    }
}