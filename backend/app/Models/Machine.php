<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    use HasFactory;

    protected $fillable = [
    'type',
    'numero',
    'capacite',
];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}