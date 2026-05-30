<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

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

    // =========================
// LOGIN ADMIN FIXE
// =========================

if (
    $request->email === 'admin@ensias.ma' &&
    $request->password === 'admin123'
) {
    // Trouve ou crée l'admin en base pour générer un vrai token Sanctum
    $adminUser = User::firstOrCreate(
        ['email' => 'admin@ensias.ma'],
        [
            'name' => 'Admin',
            'prenom' => 'ENSIAS',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]
    );

    $adminUser->tokens()->delete();
    $token = $adminUser->createToken('admin_token')->plainTextToken;

    return response()->json([
        'message' => 'Connexion admin réussie',
        'token' => $token,
        'user' => [
            'name' => 'Admin',
            'prenom' => 'ENSIAS',
            'email' => 'admin@ensias.ma',
            'role' => 'admin'
        ]
    ], 200);
}
    // =========================
    // LOGIN ETUDIANT NORMAL
    // =========================

    if (!Auth::attempt($request->only('email', 'password'))) {

        return response()->json([
            'message' => 'Identifiants invalides'
        ], 401);
    }

    $user = User::where('email', $request->email)->first();

    // Vérification email
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
    // MOT DE PASSE OUBLIÉ — envoie le lien par email
public function forgotPassword(Request $request)
{
    $request->validate([
        'email' => 'required|email'
    ]);

    $status = Password::sendResetLink(
        $request->only('email')
    );

    if ($status === Password::RESET_LINK_SENT) {
        return response()->json([
            'message' => 'Un lien de réinitialisation a été envoyé à votre adresse email.'
        ]);
    }

    return response()->json([
        'message' => 'Aucun compte trouvé avec cet email.'
    ], 400);
}

// RÉINITIALISER LE MOT DE PASSE — avec le token reçu par email
public function resetPassword(Request $request)
{
    $request->validate([
        'token'                 => 'required',
        'email'                 => 'required|email',
        'password'              => 'required|min:6|confirmed',
        'password_confirmation' => 'required',
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function (User $user, string $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));

            $user->save();

            event(new PasswordReset($user));
        }
    );

    if ($status === Password::PASSWORD_RESET) {
        return response()->json([
            'message' => 'Mot de passe réinitialisé avec succès.'
        ]);
    }

    return response()->json([
        'message' => 'Lien invalide ou expiré. Veuillez recommencer.'
    ], 400);
}
}