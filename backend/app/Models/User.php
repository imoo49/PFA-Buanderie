<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail; 

use Laravel\Sanctum\HasApiTokens;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use NotificationChannels\WebPush\HasPushSubscriptions; // ← AJOUTÉ

class User extends Authenticatable implements MustVerifyEmail // ← AJOUTÉ
{
    use HasApiTokens, HasFactory, Notifiable, HasPushSubscriptions; // ← HasPushSubscriptions ajouté

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'prenom',
        'email',
        'password',
        'role',
        'telephone',
        'numChambre',
        'genre',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}