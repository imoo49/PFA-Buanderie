<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('prenom')->after('name');
            $table->enum('role', ['etudiant', 'admin'])->default('etudiant')->after('email');
            $table->string('telephone')->nullable()->after('role');
            $table->string('numChambre')->nullable()->after('telephone');
            $table->enum('genre', ['Homme', 'Femme'])->nullable()->after('numChambre');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['prenom', 'role', 'telephone', 'numChambre', 'genre']);
        });
    }
};