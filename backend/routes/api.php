<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\CreneauController;
use App\Http\Controllers\AuthController;

// Authentification (non protégé)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées (besoin d'être connecté)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Réservations
    Route::apiResource('reservations', ReservationController::class);
    
    // Machines
    Route::get('/machines', [MachineController::class, 'index']);
    Route::get('/machines/{id}', [MachineController::class, 'show']);
    
    // Créneaux
    Route::get('/creneaux', [CreneauController::class, 'index']);
    Route::get('/creneaux/disponibles', [CreneauController::class, 'disponibles']);
});