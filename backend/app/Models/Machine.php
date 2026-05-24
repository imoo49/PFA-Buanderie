<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
     use HasFactory;

    protected $fillable = [
        'nom',
        'type',
        'etat',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
