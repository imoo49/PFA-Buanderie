<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\CreneauController;
use App\Http\Controllers\ReservationController;

Route::get('/machines', [MachineController::class, 'index']);

Route::get('/creneaux', [CreneauController::class, 'index']);

Route::get('/reservations', [ReservationController::class, 'index']);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/reservations/{id}', [ReservationController::class, 'show']);
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);