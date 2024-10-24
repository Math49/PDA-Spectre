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
        Schema::create('bdd_antecedents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->unsignedBigInteger('bdd_id');
            $table->string('description');
            $table->timestamps();

            // Définition de la clé étrangère
            $table->foreign('bdd_id')->references('id')->on('base_de_donnees')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bdd_antecedents');
    }
};
