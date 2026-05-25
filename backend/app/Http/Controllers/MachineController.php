<?php

namespace App\Http\Controllers;

use App\Models\Machine;

class MachineController extends Controller
{
    public function index()
    {
        return Machine::all();
    }
}