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
        Schema::create('user_medals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Assurez-vous que ceci est bien lié à votre table d'utilisateurs.
            $table->foreignId('medal_id')->constrained('medals')->onDelete('cascade'); // Lien vers la table des médailles.
            $table->boolean('is_active')->default(false); // Booléen pour activer/désactiver la médaille.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_medals');
    }
};
