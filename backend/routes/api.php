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
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password',  [AuthController::class, 'resetPassword']);
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
            return response()->json(['message' => 'Email déjà vérifié']);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'Email de vérification renvoyé']);

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

    Route::get('/machines',             [MachineController::class, 'index']);
    Route::get('/machines/{id}',        [MachineController::class, 'show']);
    Route::post('/machines',            [MachineController::class, 'store']);
    Route::delete('/machines/{id}',     [MachineController::class, 'destroy']);
    Route::patch('/machines/{id}/panne',[MachineController::class, 'togglePanne']);

    /*
    |--------------------------------------------------------------------------
    | CRÉNEAUX  (ordre important : routes fixes avant les routes avec {param})
    |--------------------------------------------------------------------------
    */

    Route::get('/creneaux/generer',     [CreneauController::class, 'generer']);
    Route::get('/creneaux/disponibles', [CreneauController::class, 'disponibles']);
    Route::get('/creneaux',             [CreneauController::class, 'index']);

    /*
    |--------------------------------------------------------------------------
    | NOTIFICATIONS
    |--------------------------------------------------------------------------
    */

    Route::get('/notifications', function (Request $request) {
        return $request->user()->unreadNotifications;
    });

    Route::post('/notifications/{id}/read', function (Request $request, $id) {
        $request->user()->notifications()->findOrFail($id)->markAsRead();
        return response()->json(['message' => 'Lu']);
    });

    Route::post('/notifications/read-all', function (Request $request) {
        $request->user()->unreadNotifications->markAsRead();
        return response()->json(['message' => 'Toutes lues']);
    });

    /*
    |--------------------------------------------------------------------------
    | CHATBOT
    |--------------------------------------------------------------------------
    */

    Route::post('/chat', [ChatController::class, 'chat']);

    /*
    |--------------------------------------------------------------------------
    | PUSH NOTIFICATIONS (Web Push)
    |--------------------------------------------------------------------------
    */

    Route::post('/push/subscribe', function (Request $request) {
        $request->user()->updatePushSubscription(
            endpoint:        $request->endpoint,
            publicKey:       $request->publicKey,
            authToken:       $request->authToken,
            contentEncoding: $request->contentEncoding ?? 'aesgcm'
        );
        return response()->json(['message' => 'Abonné aux notifications push']);
    });
    Route::patch('/reservations/{id}/annuler', [ReservationController::class, 'annuler']);
});