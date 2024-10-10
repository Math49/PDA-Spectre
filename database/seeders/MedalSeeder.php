<?php

namespace Database\Seeders;

use App\Models\Medal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class MedalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {   

        // Sector
        Medal::create([
            'name' => 'Ordre de la Liberté',
            'description' => 'Ordre de la Liberté',
            'role' => 15,
            'image' => '/images/medals/Liberte.png'
        ]);

        Medal::create([
            'name' => 'Médaille de Dévouement à la Protection',
            'description' => 'Médaille de Dévouement à la Protection',
            'role' => 15,
            'image' => '/images/medals/Devouement_a_la_Protection.png'
        ]);

        Medal::create([
            'name' => 'Ordre du Mérite Intrépide',
            'description' => 'Ordre du Mérite Intrépide',
            'role' => 15,
            'image' => '/images/medals/Merite_Intrepide.png'
        ]);

        // Ghost
        Medal::create([
            'name' => 'Médaille de l\'Ombre Silencieuse',
            'description' => 'Médaille de l\'Ombre Silencieuse',
            'role' => 13,
            'image' => '/images/medals/Ombre_Silencieuse.png'
        ]);

        Medal::create([
            'name' => 'Décoration de l\'Œil de Faucon',
            'description' => 'Décoration de l\'Œil de Faucon',
            'role' => 13,
            'image' => '/images/medals/Oeil_de_Faucon.png'
        ]);

        Medal::create([
            'name' => 'Médaille du Faucon Doré',
            'description' => 'Médaille du Faucon Doré',
            'role' => 13,
            'image' => '/images/medals/Faucon_Dore.png'
        ]);

        // Spirits
        Medal::create([
            'name' => 'Médaille de l\'Expert Explosif',
            'description' => 'Médaille de l\'Expert Explosif',
            'role' => 14,
            'image' => '/images/medals/Expert_Explosif.png'
        ]);

        Medal::create([
            'name' => 'Médaille de l\'Esprit Innovant',
            'description' => 'Médaille de l\'Esprit Innovant',
            'role' => 14,
            'image' => '/images/medals/Esprit_Innovant.png'
        ]);

        Medal::create([
            'name' => 'Médaille de l\'Artificier Maître',
            'description' => 'Médaille de l\'Artificier Maître',
            'role' => 14,
            'image' => '/images/medals/Artificier_Maitre.png'
        ]);

        // Executor
        Medal::create([
            'name' => 'Médaille de la Répression',
            'description' => 'Médaille de la Répression',
            'role' => 11,
            'image' => '/images/medals/Repression.png'
        ]);

        Medal::create([
            'name' => 'Médaille du Tortionnaire',
            'description' => 'Médaille du Tortionnaire',
            'role' => 11,
            'image' => '/images/medals/Tortionnaire.png'
        ]);

        Medal::create([
            'name' => 'Médaille de la Terreur',
            'description' => 'Médaille de la Terreur',
            'role' => 11,
            'image' => '/images/medals/Terreur.png'
        ]);

        // Guardian
        Medal::create([
            'name' => 'Insigne d\'Honneur Médical',
            'description' => 'Insigne d\'Honneur Médical',
            'role' => 12,
            'image' => '/images/medals/Honneur_Medical.png'
        ]);

        Medal::create([
            'name' => 'Distinction Stalium',
            'description' => 'Distinction Stalium',
            'role' => 12,
            'image' => '/images/medals/Distinction_Stalium.png'
        ]);

        Medal::create([
            'name' => 'Official Medic',
            'description' => 'Official Medic',
            'role' => 12,
            'image' => '/images/medals/Official_Medic.png'
        ]);

        // Global
        Medal::create([
            'name' => 'Médaille du Dévouement Honorifique',
            'description' => 'Médaille du Dévouement Honorifique',
            'role' => 0,
            'image' => '/images/medals/Devouement_Honorifique.png'
        ]);

        Medal::create([
            'name' => 'Décoration de Vaillance',
            'description' => 'Décoration de Vaillance',
            'role' => 0,
            'image' => '/images/medals/Vaillance.png'
        ]);

        Medal::create([
            'name' => 'Ruban de l\'exemple',
            'description' => 'Ruban de l\'exemple',
            'role' => 0,
            'image' => '/images/medals/Ruban_de_l_exemple.png'
        ]);
    }
}
