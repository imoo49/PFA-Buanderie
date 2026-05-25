<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Machine;

class MachineController extends Controller
{
    public function index(Request $request)
    {
        $query = Machine::query();

        // filtre par type si existe dans l'URL
        if ($request->type) {
            $query->where('type', $request->type);
        }

        return $query->get();
    }
}