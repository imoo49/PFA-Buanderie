<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

  protected $fillable = [
    'user_id',
    'creneau_id',
    'dateReservation',
    'dureeCycle',
    'statut',
];

// Relations déjà présentes OK ✓

    // relation vers user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // relation vers machine
    public function machine()
    {
        return $this->belongsTo(Machine::class);
    }

    // relation vers creneau
    public function creneau()
    {
        return $this->belongsTo(Creneau::class);
    }
}