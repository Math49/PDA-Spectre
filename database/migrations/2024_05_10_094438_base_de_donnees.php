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
        Schema::create('base_de_donnees', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->string('prenom');
            $table->string('grade');
            $table->string('matricule', 17);
            $table->string('branche');
            $table->boolean('GI');
            $table->string('groupe');
            $table->string('status');
            $table->string('steam_id', 17);
            $table->string('lien_photo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('base_de_donnees');
    }
};
