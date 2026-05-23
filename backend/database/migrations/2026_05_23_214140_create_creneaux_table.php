<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('creneaux', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('heureDebut');
            $table->time('heureFin');
            $table->enum('statut', ['disponible', 'reserve', 'termine'])->default('disponible');
            $table->foreignId('machine_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            // Index pour améliorer les performances
            $table->index(['date', 'machine_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('creneaux');
    }
};