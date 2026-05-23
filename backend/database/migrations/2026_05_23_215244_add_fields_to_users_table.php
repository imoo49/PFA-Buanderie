<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['etudiant', 'admin'])->default('etudiant')->after('email');
            $table->string('prenom')->after('name');
            $table->string('telephone')->nullable()->after('prenom');
            $table->string('numChambre')->nullable()->after('telephone'); // Pour les étudiants
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'prenom', 'telephone', 'numChambre']);
        });
    }
};