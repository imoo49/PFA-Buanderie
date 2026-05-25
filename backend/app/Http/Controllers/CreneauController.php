<?php

namespace App\Http\Controllers;

use App\Models\Creneau;

class CreneauController extends Controller
{
    public function index()
    {
        return Creneau::all();
    }
}