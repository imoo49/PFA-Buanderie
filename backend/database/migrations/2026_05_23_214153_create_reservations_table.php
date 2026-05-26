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

            $table->integer('dureeCycle');

            $table->enum('statut', [
                'en_attente',
                'confirmee',
                'terminee',
                'annulee'
            ])->default('en_attente');

            // utilisateur
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            // machine
            $table->foreignId('machine_id')
                ->constrained()
                ->onDelete('cascade');

            // créneau
            $table->foreignId('creneau_id')
                ->constrained('creneaux')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};