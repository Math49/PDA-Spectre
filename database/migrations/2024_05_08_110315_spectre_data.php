<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('spectre_data', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');  // Clé étrangère pour la table users
            $table->string('STEAM_ID',17);
            $table->string('matricule',17);
            $table->unsignedBigInteger('loyauté');
            $table->unsignedBigInteger('vie');
            $table->timestamps();

            // Définition de la clé étrangère
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spectre_data');
    }
};
