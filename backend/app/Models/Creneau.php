<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Creneau extends Model
{
     use HasFactory;

    protected $fillable = [
        'heure_debut',
        'heure_fin',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
