<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->date('dateReservation');
            $table->integer('dureeCycle'); // en minutes
            $table->enum('statut', ['en_attente', 'confirmee', 'terminee', 'annulee'])->default('en_attente');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // L'étudiant
            $table->foreignId('creneau_id')->constrained('creneaux')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};