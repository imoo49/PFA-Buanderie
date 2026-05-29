<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\CreneauController;
use App\Http\Controllers\ChatController;
/*
|--------------------------------------------------------------------------
| ROUTES PUBLIQUES
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Vérification email
Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {

    $user = \App\Models\User::findOrFail($id);

    if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        return response()->json(['message' => 'Lien invalide'], 400);
    }

    if ($user->hasVerifiedEmail()) {
        return response()->json(['message' => 'Email déjà vérifié']);
    }

    $user->markEmailAsVerified();

    return response()->json(['message' => 'Email vérifié avec succès']);

})->middleware('signed')->name('verification.verify');

/*
|--------------------------------------------------------------------------
| ROUTES PROTÉGÉES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // USER CONNECTÉ
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // LOGOUT
    Route::post('/logout', [AuthController::class, 'logout']);

    // EMAIL
    Route::post('/email/resend', function (Request $request) {

        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email déjà vérifié'
            ]);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Email de vérification renvoyé'
        ]);

    })->middleware('throttle:6,1');

    /*
    |--------------------------------------------------------------------------
    | RÉSERVATIONS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('reservations', ReservationController::class);

    /*
    |--------------------------------------------------------------------------
    | MACHINES
    |--------------------------------------------------------------------------
    */

    Route::get('/machines', [MachineController::class, 'index']);

    Route::get('/machines/{id}', [MachineController::class, 'show']);

    Route::post('/machines', [MachineController::class, 'store']);

    Route::delete('/machines/{id}', [MachineController::class, 'destroy']);

    Route::patch('/machines/{id}/panne', [MachineController::class, 'togglePanne']);

    /*
    |--------------------------------------------------------------------------
    | CRÉNEAUX
    |--------------------------------------------------------------------------
    */

    Route::get('/creneaux', [CreneauController::class, 'index']);

    Route::get('/creneaux/disponibles', [CreneauController::class, 'disponibles']);
    //chatbot
    Route::post('/chat', [ChatController::class, 'chat']);
});