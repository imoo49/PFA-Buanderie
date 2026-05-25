<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Creneau extends Model
{
     use HasFactory;

    protected $fillable = [
    'date',
    'heureDebut',
    'heureFin',
    'statut',
    'machine_id',
];

public function machine()
{
    return $this->belongsTo(Machine::class);
}

public function reservations()
{
    return $this->hasMany(Reservation::class);
}
}
