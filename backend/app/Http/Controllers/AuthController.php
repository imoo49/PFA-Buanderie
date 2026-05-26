<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'prenom' => 'required|string',

            'email' => [
                'required',
                'email',
                'unique:users',
                'regex:/^[a-zA-Z0-9._%+-]+@um5\.ac\.ma$/'
            ],

            'password' => 'required|min:6',

            'telephone' => 'required',

            'numChambre' => 'required',

            'genre' => 'required|in:Homme,Femme',
        ]);

        $user = User::create([
            'name' => $request->name,

            'prenom' => $request->prenom,

            'email' => $request->email,

            'password' => Hash::make($request->password),

            'role' => 'etudiant',

            'telephone' => $request->telephone,

            'numChambre' => $request->numChambre,

            'genre' => $request->genre,
        ]);

        $user->sendEmailVerificationNotification(); // ← AJOUTÉ

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Compte créé avec succès',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {

            return response()->json([
                'message' => 'Identifiants invalides'
            ], 401);

        }

        $user = User::where('email', $request->email)->first();

        // Bloquer si email non vérifié ← AJOUTÉ
        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Veuillez vérifier votre adresse email avant de vous connecter.'
            ], 403);
        }

        // Supprimer anciens tokens
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ], 200);
    }
}