<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['rappel', 'confirmation', 'annulation', 'info']);
            $table->dateTime('heureEnvoi');
            $table->date('dateEnvoi');
            $table->enum('statut', ['envoyee', 'en_attente', 'echouee'])->default('en_attente');
            $table->text('message');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};