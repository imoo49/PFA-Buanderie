<?php
namespace App\Http\Controllers;

use App\Models\Creneau;
use Illuminate\Http\Request;

class CreneauController extends Controller
{
    public function index()
    {
        return Creneau::with('machine')->get();
    }

    public function disponibles()
    {
        return Creneau::where('statut', 'disponible')
                      ->with('machine')
                      ->get();
    }
}